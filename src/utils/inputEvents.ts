import { Block } from '../components/block';
import { showInputs } from './show_inputs';

function inputBlur(e: InputEvent, regExp: RegExp, allowNull: boolean = false) {
  const target = e.target as HTMLInputElement;
  if (target.value.match(regExp)) {
    target.classList.remove('invalid');
    return true;
  }
  if (allowNull) {
    if (target.value === "") {
      return true;
    }
  }
  target.classList.add('invalid');
  return false;
}

export function inputFocus(hint?: Block<object>) {
  return function (e: InputEvent) {
    const target = e.target as HTMLInputElement;
    if (target.classList.contains('invalid')) target.classList.remove('invalid');
    if (hint) {
      hint.hide();
    }
  };
}

export function submitCheck(e: SubmitEvent): boolean {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);
  const inputs = Array.from(form.querySelectorAll('input'));
  for (let i of inputs) {
    if (i.classList.contains('invalid')) return false;
    if (i.value.trim() === '') {
      i.classList.add('invalid');
      return false;
    }
  }
  if (formData.has('password') && formData.has('password_repeat')) {
    if (formData.get('password') !== formData.get('password_repeat')) {
      form.querySelector('#password').classList.add('invalid');
      form.querySelector('#password_repeat').classList.add('invalid');
      return false;
    }
  }
  showInputs(form);
  return true;
}

export const loginBlur = function (hint?: Block<object>, allowNull: boolean = false) {
  return function (e: InputEvent) {
    if (!inputBlur(e, /^(?=.*[a-zA-Z])(?!.*[\W_]).{3,20}$/, allowNull)) {
      if (hint) {
        hint.show();
      }
    }
  };
};
export const passBlur = function (hint?: Block<object>, allowNull: boolean = false) {
  return function (e: InputEvent) {
    if (!inputBlur(e, /^(?=.*\d)(?=.*[А-ЯA-Z]).{8,40}$/, allowNull)) {
      if (hint) {
        hint.show();
      }
    }
  };
};
export const passRepeatBlur = function (form: HTMLFormElement, hint?: Block<object>, allowNull: boolean = false) {
  return function (e: InputEvent) {
    const target = e.target as HTMLInputElement;
    const formData = new FormData(form);
    if (formData.get('password') !== formData.get('password_repeat')) {
      target.classList.add('invalid');
      if (hint) {
        hint.show();
      }
    }
  };
};
export const phoneBlur = function (hint?: Block<object>, allowNull: boolean = false) {
  return function (e: InputEvent) {
    if (!inputBlur(e, /^\+\d{9,14}$|^\d{10,15}$/, allowNull)) {
      if (hint) {
        hint.show();
      }
    }
  };
};
export const emailBlur = function (hint?: Block<object>, allowNull: boolean = false) {
  return function (e: InputEvent) {
    if (!inputBlur(e, /^[\w0-9-+=*~&$#!^]+@[a-zA-Z]+\.[a-zA-Z]+$/, allowNull)) {
      if (hint) {
        hint.show();
      }
    }
  };
};
export const nameBlur = function (hint?: Block<object>, allowNull: boolean = false) {
  return function (e: InputEvent) {
    if (!inputBlur(e, /^[А-ЯЁA-Z][а-яёa-zА-ЯЁA-Z]*(([-][а-яёa-zА-ЯЁA-Z])?[а-яёa-zА-ЯЁA-Z]*)*$/, allowNull)) {
      if (hint) {
        hint.show();
      }
    }
  };
};
export const messageBlur = function (hint?: Block<object>, allowNull: boolean = false) {
  return function (e: InputEvent) {
    if (!inputBlur(e, /(?=.*\S).*/, allowNull)) {
      if (hint) {
        hint.show();
      }
    }
  };
};
