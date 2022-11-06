import '../../../../../.d';
import { Block } from '../../../../components/block';
import { Input } from '../../../../components/input/input';
import { Button } from '../../../../components/button/button';
import { FormType, ElemType } from './types';
import mainhbs from './main.hbs';
import { PassHint } from '../../../../components/hints/passHint';
import { PassRepeatHint } from '../../../../components/hints/passRepeat';
import { EmailHint } from '../../../../components/hints/emailHint';
import { PhoneHint } from '../../../../components/hints/phoneHint';
import { NameHint } from '../../../../components/hints/nameHint';
import { LoginHint } from '../../../../components/hints/loginHint';
import * as inputEvents from '../../../../utils/inputEvents';

const elems: ElemType = {
  loginInput: new Input({
    id: 'first_name',
    name: 'first_name',
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
  chatNameInput: new Input({
    id: 'chat_name',
    name: 'chat_name',
    type: 'text',
  }),
  phoneInput: new Input({
    id: 'phone',
    name: 'phone',
    type: 'text',
  }),
  button: new Button({
    text: 'Сохранить',
    name: 'Enter',
    type: 'submit',
    class: 'button',
  }),
  emailHint: new EmailHint(),
  phoneHint: new PhoneHint(),
  firstNameHint: new NameHint(),
  secondNameHint: new NameHint(),
  chatNameHint: new NameHint(),
  loginHint: new LoginHint(),
};

class DataForm extends Block<FormType> {
  public constructor(events: EventType) {
    super('form', { events, elements: elems });
  }

  public componentDidMount(): void {
    const { elements } = this.props;
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
    elements.chatNameInput.props.events = {
      blur: inputEvents.nameBlur(elements.chatNameHint),
      focus: inputEvents.inputFocus(elements.chatNameHint),
    };
  }

  public render(): string {
    const { elements } = this.props;
    return mainhbs({
      chatNameInput: elements.chatNameInput.getContent().outerHTML,
      firstNameInput: elements.firstNameInput.getContent().outerHTML,
      secondNameInput: elements.secondNameInput.getContent().outerHTML,
      loginInput: elements.loginInput.getContent().outerHTML,
      phoneInput: elements.phoneInput.getContent().outerHTML,
      emailInput: elements.emailInput.getContent().outerHTML,
      button: elements.button.getContent().outerHTML,
      emailHint: elements.emailHint.getContent().outerHTML,
      phoneHint: elements.phoneHint.getContent().outerHTML,
      firstNameHint: elements.firstNameHint.getContent().outerHTML,
      secondNameHint: elements.secondNameHint.getContent().outerHTML,
      chatNameHint: elements.chatNameHint.getContent().outerHTML,
      loginHint: elements.loginHint.getContent().outerHTML,
    });
  }
}

export { DataForm };
