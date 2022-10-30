import mainhbs from './main.hbs';
import mainPage from '../main/index';
import passwordPage from '../change_password/index';
import dataPage from '../change_data/index';
import { Container } from '../../utils/container';
import * as classes from './styles.module.scss';

// making a main element

const thisPage = new Container(mainhbs());

thisPage.getContent().querySelector('.exit')!.addEventListener('click', () => {
  mainPage();
});

thisPage.getContent().querySelector('.pass')!.addEventListener('click', () => {
  passwordPage();
});

thisPage.getContent().querySelector('.data')!.addEventListener('click', () => {
  dataPage();
});

thisPage.modulateClasses(classes);

const pageExport = function () {
  document.getElementById('root')!.textContent = '';
  document.getElementById('root')!.appendChild(thisPage.getContent());
};

export default pageExport;
