import '../../../.d';
import mainhbs from './main.hbs';
import userPage from '../user/index';
import { showInputs } from '../../utils/show_inputs';
import { Container } from '../../utils/container';
import { Button } from '../../utils/button';
import * as classes from './styles.module.scss';

// making a main element

const button = new Button("Сохранить", "Password-change")
const thisPage = new Container(
  mainhbs({button: button.getContent().outerHTML})
  );

thisPage.getContent().querySelector('form')!.addEventListener('submit', () => {
  const form = new FormData(thisPage.getContent().querySelector('form'))
  if (form.get("new_password") !== form.get("new_password_repeat")) return
  showInputs(thisPage.getContent());
  userPage();
});

thisPage.modulateClasses(classes);

const pageExport = function () {
  document.getElementById('root')!.textContent = '';
  document.getElementById('root')!.appendChild(thisPage.getContent());
};

export default pageExport;
