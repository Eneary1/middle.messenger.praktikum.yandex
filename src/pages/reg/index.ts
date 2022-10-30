import mainhbs from './main.hbs';
import { hbsToHtml, modulateClasses } from '../../utils/converter';
import mainPage from '../main/index';
import authorPage from '../author/index';
import { showInputs } from '../../utils/show_inputs';
import * as classes from './styles.module.scss';
import { Container } from '../../utils/container';

// making a main element

const thisPage = new Container(mainhbs());

thisPage.getContent().querySelector('button')!.addEventListener('click', (e) => {
  showInputs(thisPage.getContent());
  e.preventDefault();
  mainPage();
});

thisPage.getContent().querySelector('.link')!.addEventListener('click', () => {
  authorPage();
});

thisPage.modulateClasses(classes);

const pageExport = function () {
  document.getElementById('root')!.textContent = '';
  document.getElementById('root')!.appendChild(thisPage.getContent());
};

export default pageExport;
