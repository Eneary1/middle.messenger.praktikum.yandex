import '../../../../../.d';
import { Block } from '../../../../components/block';
import { Input } from '../../../../components/input/input';
import { Button } from '../../../../components/button/button';
import { FormType, ElemType } from './types';
import mainhbs from './main.hbs';
import { Link } from '../../../../components/link/link';
import { routeFunc } from '../../../../utils/route_func';
import { HASHES } from '../../../../utils/hash_enum';
import * as inputEvents from '../../../../utils/inputEvents';
import { PassHint } from '../../../../components/hints/passHint';
import { LoginHint } from '../../../../components/hints/loginHint';

function linkFunc() {
  routeFunc(HASHES.REG);
}

const elems: () => ElemType = () => {
  return {
    passHint: new PassHint(),
    loginHint: new LoginHint(),
    loginInput: new Input(
      {
        id: 'login',
        name: 'login',
        type: 'text',
      },
      {
        blur: inputEvents.loginBlur,
        focus: inputEvents.inputFocus,
      },
    ),
    passInput: new Input({
      id: 'password',
      name: 'password',
      type: 'password',
    }),
    link: new Link(
      {
        class: 'link',
        text: 'Нет аккаунта?',
      },
      {
        click: linkFunc,
      },
    ),
    button: new Button({
      text: 'Войти',
      name: 'Enter',
      type: 'submit',
      class: 'button',
    }),
  }
}

class AuthorForm extends Block<FormType> {
  public constructor(events: EventType) {
    super('form', {
      events,
      elements: elems(),
    });
  }

  public componentDidMount(): void {
    const { elements } = this.props;
    this.props.elements.passInput.props.events = {
      blur: inputEvents.passBlur(elements.passHint),
      focus: inputEvents.inputFocus(elements.passHint),
    };

    this.props.elements.loginInput.props.events = {
      blur: inputEvents.loginBlur(elements.loginHint),
      focus: inputEvents.inputFocus(elements.loginHint),
    };
  }

  public render(): string {
    const element = this.props.elements;
    return mainhbs({
      loginInput: element.loginInput.getContent().outerHTML,
      passInput: element.passInput.getContent().outerHTML,
      link: element.link.getContent().outerHTML,
      button: element.button.getContent().outerHTML,
      passHint: element.passHint.getContent().outerHTML,
      loginHint: element.loginHint.getContent().outerHTML,
    });
  }
}

export { AuthorForm };
