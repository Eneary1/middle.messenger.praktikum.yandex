import '../../../.d';
import authorPage from '../author/index';
import mainPage from '../main/index';
import regPage from '../reg/index';
import userPage from '../user/index';
import dataPage from '../change_data/index';
import passwordPage from '../change_password/index';
import page404 from '../404/index';
import page500 from '../500/index';
import mainhbs from './main.hbs';
import { Container } from '../../utils/container';
import { hashes } from '../../utils/hash_enum';
import { appendFunc } from '../../utils/append_func';
import * as classes from './styles.module.scss';

const thisPage = new Container(mainhbs());
const anchors = thisPage.getContent().querySelectorAll('a');

anchors.forEach((a) => a.addEventListener('click', () => {
  location.assign(`http://${location.host}/#${a.id.slice(0, 2) === 'id' ? a.id.match(/404|500/)[0] : a.id}`);
}));

thisPage.modulateClasses(classes);

function thisPageShow() {
  appendFunc(thisPage.getContent());
}

function hashChanged() {
  switch (location.hash.slice(1, location.hash.length)) {
    case hashes.ENTER:
      authorPage();
      return;
    case hashes.REG:
      regPage();
      return;
    case hashes.MAIN:
      mainPage();
      return;
    case hashes.PROFILE:
      userPage();
      return;
    case hashes.PASS:
      passwordPage();
      return;
    case hashes.DATA:
      dataPage();
      return;
    case hashes.HASH404:
      page404();
      return;
    case hashes.HASH500:
      page500();
      return;
    default:
      thisPageShow();
  }
}

window.addEventListener('load', hashChanged);
window.addEventListener('hashchange', hashChanged);

console.log("%c Список ссылок на все страницы ", "background-color:hsl(10,70%,45%)")
console.table(    
    [["Страница входа", "http://localhost:3000/#enter"],
    ["Страница регистрации", "http://localhost:3000/#reg"],
    ["Главная страница", "http://localhost:3000/#main"],
    ["Стрница профиля", "http://localhost:3000/#profile"],
    ["Изменение пароля", "http://localhost:3000/#pass"],
    ["Изменение данных", "http://localhost:3000/#data"],
    ["404", "http://localhost:3000/#404"],
    ["500", "http://localhost:3000/#500"]]
)
