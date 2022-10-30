import '../../../.d';
import mainhbs from './main.hbs';
import mainPage from '../main/index';
import regPage from '../reg/index';
import { showInputs } from '../../utils/show_inputs';
import { Container } from '../../utils/container';
import * as classes from './styles.module.scss';

// making a main element

const thisPage = new Container(mainhbs());

thisPage.getContent().querySelector('button')!.addEventListener('click', (e) => {
  showInputs(thisPage.getContent());
  e.preventDefault();
  mainPage();
});

thisPage.getContent().querySelector('.link')!.addEventListener('click', () => {
  regPage();
});

thisPage.modulateClasses(classes);

const pageExport = function () {
  document.getElementById('root')!.textContent = '';
  document.getElementById('root')!.appendChild(thisPage.getContent());
};

export default pageExport;
