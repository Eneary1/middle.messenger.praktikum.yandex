import { Page404 } from '../src/pages/404/components/container/container';
import { Page500 } from '../src/pages/500/components/container/container';
import { AuthorPage } from '../src/pages/author/components/container/container';
import { DataPage } from '../src/pages/changeData/components/container/container';
import { PassPage } from '../src/pages/changePassword/components/container/container';
import { MainPage } from '../src/pages/main/index';
import { NavPage } from '../src/pages/nav/components/container/container';
import { RegPage } from '../src/pages/reg/components/container/container';
import { UserPage } from '../src/pages/user/components/container/container';
import { NewFetch } from '../src/utils/newFetch';
import { baseURL, PATHS, ROUTES } from '../src/utils/routeEnum';
import { router } from '../src/utils/router';
import { modalInstance } from '../src/components/modal/modal';
import '../.d';
import './styles.scss';

window.barsReload = [];
window.chat = [];
window.bottom = [];
window.chatUpdate = [];

new NewFetch().get(`${baseURL}${PATHS.USER}`)
  .finally(async () => {
    await new NewFetch().get(`${baseURL}${PATHS.USER}`)
      .then((a) => { window.avatar = JSON.parse(a.response).avatar; })
      .catch(() => {});
  })
  .then(async () => {
    await new NewFetch().get(`${baseURL}${PATHS.CHATS}`).then((a) => JSON.parse(a.response)).then((res) => {
      res.forEach((a) => {
        router.use(`${ROUTES.MAIN}/${a.id}`, MainPage);
      });
    });
    router
      .use(ROUTES.NAV, NavPage)
      .use(ROUTES.DATA, DataPage)
      .use(ROUTES.ROUTE404, Page404)
      .use(ROUTES.ROUTE500, Page500)
      .use(ROUTES.MAIN, MainPage)
      .use(ROUTES.PASS, PassPage)
      .use(ROUTES.PROFILE, UserPage)
      .use(ROUTES.ENTER, AuthorPage)
      .start();
  })
  .catch(() => {
    router
      .use(ROUTES.NAV, NavPage)
      .use(ROUTES.ENTER, AuthorPage)
      .use(ROUTES.ROUTE404, Page404)
      .use(ROUTES.ROUTE500, Page500)
      .use(ROUTES.REG, RegPage)
      .start();
  });
let h: any;
class Socket {
  public socket: WebSocket;

  public async socketChange() {
    if (!router.selectedChat()) return;
    let userID;
    await new NewFetch().get(`${baseURL}${PATHS.USER}`).then((a) => { userID = JSON.parse(a.response).id; });
    await new NewFetch().post(`${baseURL}${PATHS.TOKEN}/${router.selectedChat()}`)
      .then((a) => {
        this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userID}/${router.selectedChat()}/${JSON.parse(a.response).token}`);
        h = setInterval(() => {
          this.socket.send(JSON.stringify({
            type: 'ping',
          }));
        }, 5000);
      });

    window.socket.socket.onmessage = async (event: MessageEvent) => {
      window.bottom.forEach((a) => {
        if (document.contains(a.getContent())) {
          a.chatUpd(event);
        }
      });
    };

    this.socket.addEventListener('open', () => {
      console.log('Соединение установлено');
      this.socket.send(JSON.stringify({
        content: '0',
        type: 'get old',
      }));
    });

    this.socket.addEventListener('close', (event) => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }
      clearTimeout(h);
      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    this.socket.addEventListener('error', (event: ErrorEvent) => {
      console.log('Ошибка', event.message);
    });

    window.barsReload.forEach((a) => { a(); });
    window.chatUpdate.forEach((a) => { a(); });
  }
}

window.socket = new Socket();
window.socket.socketChange();

document.body.appendChild(modalInstance.getContent());

console.log('%c Список ссылок на все страницы ', 'background-color:hsl(10,70%,45%)');
console.table(
  [['Страница входа', `http://${location.host}${ROUTES.ENTER}`],
    ['Страница регистрации', `http://${location.host}${ROUTES.REG}`],
    ['Главная страница', `http://${location.host}${ROUTES.MAIN}`],
    ['Стрница профиля', `http://${location.host}${ROUTES.PROFILE}`],
    ['Изменение пароля', `http://${location.host}${ROUTES.PASS}`],
    ['Изменение данных', `http://${location.host}${ROUTES.DATA}`],
    ['404', `http://${location.host}${ROUTES.ROUTE404}`],
    ['500', `http://${location.host}${ROUTES.ROUTE500}`]],
);
