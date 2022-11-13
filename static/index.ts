import { Page404 } from "../src/pages/404/components/container/container";
import { Page500 } from "../src/pages/500/components/container/container";
import { AuthorPage } from "../src/pages/author/components/container/container";
import { DataPage } from "../src/pages/changeData/components/container/container";
import { PassPage } from "../src/pages/changePassword/components/container/container";
import { MainPage } from "../src/pages/main/index";
import { navPage } from "../src/pages/nav/index";
import { RegPage } from "../src/pages/reg/components/container/container";
import { UserPage } from "../src/pages/user/components/container/container";
import { ROUTES } from "../src/utils/hash_enum";
import { router } from '../src/utils/router';

router
  .use(ROUTES.NAV, navPage)
  .use(ROUTES.ENTER, AuthorPage)
  .use(ROUTES.DATA, DataPage)
  .use(ROUTES.HASH404, Page404)
  .use(ROUTES.HASH500, Page500)
  .use(ROUTES.MAIN, MainPage)
  .use(ROUTES.PASS, PassPage)
  .use(ROUTES.PROFILE, UserPage)
  .use(ROUTES.REG, RegPage)
  .start();

console.log('%c Список ссылок на все страницы ', 'background-color:hsl(10,70%,45%)');
console.table(
  [['Страница входа', `http://${location.host}/#enter`],
    ['Страница регистрации', `http://${location.host}/#reg`],
    ['Главная страница', `http://${location.host}/#main`],
    ['Стрница профиля', `http://${location.host}/#profile`],
    ['Изменение пароля', `http://${location.host}/#pass`],
    ['Изменение данных', `http://${location.host}/#data`],
    ['404', `http://${location.host}/#404`],
    ['500', `http://${location.host}/#500`]],
);