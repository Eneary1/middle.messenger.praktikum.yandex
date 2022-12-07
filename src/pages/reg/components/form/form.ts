import '../../../../../.d';
import { Block } from '../../../../components/block';
import { Input } from '../../../../components/input/input';
import { Button } from '../../../../components/button/button';
import { FormType, ElemType } from './types';
import mainhbs from './main.hbs';
import { Link } from '../../../../components/link/link';
import { ROUTES } from '../../../../utils/routeEnum';
import * as inputEvents from '../../../../utils/inputEvents';
import { PassHint } from '../../../../components/hints/passHint';
import { EmailHint } from '../../../../components/hints/emailHint';
import { PhoneHint } from '../../../../components/hints/phoneHint';
import { NameHint } from '../../../../components/hints/nameHint';
import { LoginHint } from '../../../../components/hints/loginHint';
import { PassRepeatHint } from '../../../../components/hints/passRepeat';
import { router } from '../../../../utils/router';
import Handlebars from "handlebars";

function linkFunc() {
  router.go(ROUTES.ENTER);
}

const elems: ElemType = {
  phoneInput: new Input({
    id: 'phone',
    name: 'phone',
    type: 'text',
  }),
  loginInput: new Input({
    id: 'login',
    name: 'login',
    type: 'text',
  }),
  emailInput: new Input({
    id: 'email',
    name: 'email',
    type: 'email',
  }),
  firstNameInput: new Input({
    id: 'first_name',
    name: 'first_name',
    type: 'text',
  }),
  secondNameInput: new Input({
    id: 'second_name',
    name: 'second_name',
    type: 'text',
  }),
  passInput: new Input({
    id: 'password',
    name: 'password',
    type: 'password',
  }),
  passRepeat: new Input({
    id: 'password_repeat',
    name: 'password_repeat',
    type: 'password',
  }),
  button: new Button({
    text: 'Зарегестрироваться',
    name: 'Sign up',
    type: 'submit',
    class: 'button',
  }),
  link: new Link(
    {
      text: 'Войти',
      class: 'link',
    },
    {
      click: linkFunc,
    },
  ),
  passHint: new PassHint(),
  passRepeatHint: new PassRepeatHint(),
  emailHint: new EmailHint(),
  phoneHint: new PhoneHint(),
  firstNameHint: new NameHint(),
  secondNameHint: new NameHint(),
  loginHint: new LoginHint(),
};

class RegForm extends Block<FormType> {
  public constructor(events: EventType) {
    super('form', { events, elements: elems });
  }

  public componentDidMount(): void {
    const { elements } = this.props;
    elements.passInput.props.events = {
      blur: inputEvents.passBlur(elements.passHint),
      focus: inputEvents.inputFocus(elements.passHint),
    };
    elements.passRepeat.props.events = {
      blur: inputEvents.passRepeatBlur(this.getContent() as HTMLFormElement, elements.passRepeatHint),
      focus: inputEvents.inputFocus(elements.passRepeatHint),
    };
    elements.loginInput.props.events = {
      blur: inputEvents.loginBlur(elements.loginHint),
      focus: inputEvents.inputFocus(elements.loginHint),
    };
    elements.emailInput.props.events = {
      blur: inputEvents.emailBlur(elements.emailHint),
      focus: inputEvents.inputFocus(elements.emailHint),
    };
    elements.phoneInput.props.events = {
      blur: inputEvents.phoneBlur(elements.phoneHint),
      focus: inputEvents.inputFocus(elements.phoneHint),
    };
    elements.firstNameInput.props.events = {
      blur: inputEvents.nameBlur(elements.firstNameHint),
      focus: inputEvents.inputFocus(elements.firstNameHint),
    };
    elements.secondNameInput.props.events = {
      blur: inputEvents.nameBlur(elements.secondNameHint),
      focus: inputEvents.inputFocus(elements.secondNameHint),
    };
  }

  public render(): string {
    const { elements } = this.props;
    return Handlebars.compile(mainhbs)({
      passInput: elements.passInput.getContent().outerHTML,
      passRepeat: elements.passRepeat.getContent().outerHTML,
      firstNameInput: elements.firstNameInput.getContent().outerHTML,
      secondNameInput: elements.secondNameInput.getContent().outerHTML,
      loginInput: elements.loginInput.getContent().outerHTML,
      phoneInput: elements.phoneInput.getContent().outerHTML,
      emailInput: elements.emailInput.getContent().outerHTML,
      button: elements.button.getContent().outerHTML,
      link: elements.link.getContent().outerHTML,
      passHint: elements.passHint.getContent().outerHTML,
      passRepeatHint: elements.passRepeatHint.getContent().outerHTML,
      emailHint: elements.emailHint.getContent().outerHTML,
      phoneHint: elements.phoneHint.getContent().outerHTML,
      firstNameHint: elements.firstNameHint.getContent().outerHTML,
      secondNameHint: elements.secondNameHint.getContent().outerHTML,
      loginHint: elements.loginHint.getContent().outerHTML,
    });
  }
}

export { RegForm };
