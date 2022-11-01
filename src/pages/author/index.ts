import '../../../.d';
import mainhbs from './main.hbs';
import { showInputs } from '../../utils/show_inputs';
import { Container } from '../../utils/container';
import { Button } from '../../utils/button';
import { routeFunc } from '../../utils/route_func';
import { hashes } from '../../utils/hash_enum';
import { appendFunc } from '../../utils/append_func';
import * as classes from './styles.module.scss';

// making a main element

const button = new Button('Войти', 'Enter');
const thisPage = new Container(
  mainhbs({ button: button.getContent().outerHTML }),
);

const password: HTMLInputElement = thisPage.getContent().querySelector('#password');
const login: HTMLInputElement = thisPage.getContent().querySelector('#login');
const inputs = [login, password];

password.addEventListener('blur', () => {
  if (password.value !== '') {
    password.classList.remove(classes.invalid);
  } else {
    password.classList.add(classes.invalid);
  }
});

login.addEventListener('blur', () => {
  if (login.value !== '') {
    login.classList.remove(classes.invalid);
  } else {
    login.classList.add(classes.invalid);
  }
});

login.addEventListener('focus', () => {
  if (login.classList.contains(classes.invalid)) login.classList.remove(classes.invalid);
});
password.addEventListener('focus', () => {
  if (password.classList.contains(classes.invalid)) password.classList.remove(classes.invalid);
});

thisPage.getContent().querySelector('button')!.addEventListener('click', (e) => {
  e.preventDefault();
  for (let i of inputs) {
    if (i.classList.contains(classes.invalid)) return;
    if (i.value === '') {
      i.classList.add(classes.invalid);
      return;
    }
  }
  showInputs(thisPage.getContent());
  routeFunc(hashes.MAIN);
});

thisPage.getContent().querySelector('.link')!.addEventListener('click', () => {
  routeFunc(hashes.REG);
});

thisPage.modulateClasses(classes);

const pageExport = function () {
  appendFunc(thisPage.getContent());
};

export default pageExport;
