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

const button = new Button('Сохранить', 'Password-change');
const thisPage = new Container(
  mainhbs({ button: button.getContent().outerHTML }),
);

const password: HTMLInputElement = thisPage.getContent().querySelector('#new_password');
const passwordRepeat: HTMLInputElement = thisPage.getContent().querySelector('#new_password_repeat');
const oldPassword: HTMLInputElement = thisPage.getContent().querySelector('#old_password');
const inputs = [oldPassword, password, passwordRepeat];
const submitButton = thisPage.getContent().querySelector('button');
const hint1 = thisPage.getContent().querySelector('.hint_1');
const hint2 = thisPage.getContent().querySelector('.hint_2');

password.addEventListener('blur', () => {
  if (password.value.match(/\w{8,}/) === null) {
    password.classList.add(classes.invalid);
    hint1.classList.remove('none');
  }
  if (password.value === passwordRepeat.value && passwordRepeat.classList.contains(classes.invalid)) {
    passwordRepeat.classList.remove(classes.invalid);
    hint2.classList.add('none');
  }
});

passwordRepeat.addEventListener('blur', () => {
  if (password.value !== passwordRepeat.value) {
    passwordRepeat.classList.add(classes.invalid);
    hint2.classList.remove('none');
  } else {
    passwordRepeat.classList.remove(classes.invalid);
    hint2.classList.add('none');
  }
});

oldPassword.addEventListener('blur', () => {
  if (oldPassword.value !== '') {
    oldPassword.classList.remove(classes.invalid);
  } else {
    oldPassword.classList.add(classes.invalid);
  }
});

password.addEventListener('focus', () => {
  if (password.classList.contains(classes.invalid)) password.classList.remove(classes.invalid);
  hint1.classList.add('none');
});
passwordRepeat.addEventListener('focus', () => {
  if (passwordRepeat.classList.contains(classes.invalid)) passwordRepeat.classList.remove(classes.invalid);
  hint2.classList.add('none');
});
oldPassword.addEventListener('focus', () => {
  if (oldPassword.classList.contains(classes.invalid)) oldPassword.classList.remove(classes.invalid);
});

submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  for (let i of inputs) {
    if (i.classList.contains(classes.invalid)) return;
    if (i.value === '') {
      i.classList.add(classes.invalid);
      return;
    }
  }
  if (password.value !== passwordRepeat.value) {
    password.classList.add(classes.invalid);
    passwordRepeat.classList.add(classes.invalid);
    hint2.classList.remove('none');
    return;
  }
  showInputs(thisPage.getContent());
  routeFunc(hashes.PROFILE);
});

thisPage.modulateClasses(classes);

const pageExport = function () {
  appendFunc(thisPage.getContent());
};

export default pageExport;
