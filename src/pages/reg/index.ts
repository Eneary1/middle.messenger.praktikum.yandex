import mainhbs from './main.hbs';
import mainPage from '../main/index';
import authorPage from '../author/index';
import { showInputs } from '../../utils/show_inputs';
import { Container } from '../../utils/container';
import { Button } from '../../utils/button';
import * as classes from './styles.module.scss';

// making a main element

const button = new Button('Зарегестрироваться', 'Sign up');
const thisPage = new Container(
  mainhbs({ button: button.getContent().outerHTML }),
);

const password: HTMLInputElement = thisPage.getContent().querySelector('#password');
const passwordRepeat: HTMLInputElement = thisPage.getContent().querySelector('#password_repeat');

password.addEventListener('input', () => {
  if (password.validity.patternMismatch) {
    password.setCustomValidity('Минимум 8 символов');
    password.reportValidity();
  } else {
    password.setCustomValidity('');
  }
});

passwordRepeat.addEventListener('input', () => {
  const form = new FormData(thisPage.getContent().querySelector('form'));
  if (form.get('password') !== form.get('password_repeat')) {
    passwordRepeat.setCustomValidity('Пароли должны повторяться');
    passwordRepeat.reportValidity();
  } else {
    passwordRepeat.setCustomValidity('');
  }
});

thisPage.getContent().querySelector('form')!.addEventListener('submit', () => {
  showInputs(thisPage.getContent());
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
