import mainhbs from './main.hbs';
import userPage from '../user/index';
import { showInputs } from '../../utils/show_inputs';
import { Container } from '../../utils/container';
import * as classes from './styles.module.scss';

// making a main element

const thisPage = new Container(mainhbs());

thisPage.getContent().querySelector('button')!.addEventListener('click', (e) => {
  showInputs(thisPage.getContent());
  e.preventDefault();
  userPage();
});

thisPage.modulateClasses(classes);

const pageExport = function () {
  document.getElementById('root')!.textContent = '';
  document.getElementById('root')!.appendChild(thisPage.getContent());
};

export default pageExport;
