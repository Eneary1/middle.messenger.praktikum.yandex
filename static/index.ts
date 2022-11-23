import { Page404 } from "../src/pages/404/components/container/container";
import { Page500 } from "../src/pages/500/components/container/container";
import { AuthorPage } from "../src/pages/author/components/container/container";
import { DataPage } from "../src/pages/changeData/components/container/container";
import { PassPage } from "../src/pages/changePassword/components/container/container";
import { MainPage } from "../src/pages/main/index";
import { NavPage } from "../src/pages/nav/components/container/container";
import { RegPage } from "../src/pages/reg/components/container/container";
import { UserPage } from "../src/pages/user/components/container/container";
import { NewFetch } from "../src/utils/newFetch";
import { ROUTES } from "../src/utils/routeEnum";
import { router } from '../src/utils/router';

window.barsReload = []
window.chat = []
window.chatUpdate = []

new NewFetch().get("https://ya-praktikum.tech/api/v2/auth/user")
.then( async ()=>{
  await new NewFetch().get("https://ya-praktikum.tech/api/v2/chats").then((a)=>{
    return JSON.parse(a.response)
  }).then((res)=>{
    res.forEach((a) => {
      router.use(`${ROUTES.MAIN}/${a.id}`, MainPage)
    }); 
  })
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
.catch(()=>{
  router
  .use(ROUTES.NAV, NavPage)
  .use(ROUTES.ENTER, AuthorPage)
  .use(ROUTES.ROUTE404, Page404)
  .use(ROUTES.ROUTE500, Page500)
  .use(ROUTES.REG, RegPage)
  .start();
})

console.log('%c Список ссылок на все страницы ', 'background-color:hsl(10,70%,45%)');
console.table(
  [['Страница входа', `http://${location.host}${ROUTES.ENTER}`],
    ['Страница регистрации', `http://${location.host}${ROUTES.REG}`],
    ['Главная страница', `http://${location.host}${ROUTES.MAIN}`],
    ['Стрница профиля', `http://${location.host}${ROUTES.PROFILE}`],
    ['Изменение пароля', `http://${location.host}${ROUTES.PASS}`],
    ['Изменение данных', `http://${location.host}${ROUTES.DATA}`],
    ['404', `http://${location.host}${ROUTES.ROUTE404}`],
    ['500', `http://${location.host}${ROUTES.ROUTE500}`]]
);