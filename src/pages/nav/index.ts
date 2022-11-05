import '../../../.d';
import { Container } from '../../components/container';
import { appendFunc } from '../../utils/append_func';
import mainhbs from './main.hbs';
import { hashChanged } from './hashChanged';
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

window.addEventListener('load', hashChanged(thisPageShow));
window.addEventListener('hashchange', hashChanged(thisPageShow));

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
