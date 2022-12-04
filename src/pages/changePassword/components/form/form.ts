import '../../../../../.d';
import { Block } from '../../../../components/block';
import { Input } from '../../../../components/input/input';
import { Button } from '../../../../components/button/button';
import { FormType, ElemType } from './types';
import mainhbs from './main.hbs';
import * as inputEvents from '../../../../utils/inputEvents';
import { PassHint } from '../../../../components/hints/passHint';
import { PassRepeatHint } from '../../../../components/hints/passRepeat';

const elems: () => ElemType = () => ({
  oldPass: new Input({
    id: 'old_password',
    name: 'old_password',
    type: 'password',
  }),
  pass: new Input({
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
    text: 'Сохранить',
    name: 'Password-change',
    type: 'submit',
    class: 'button',
  }),
  oldPassHint: new PassHint(),
  passHint: new PassHint(),
  passRepeatHint: new PassRepeatHint(),
});

class PassForm extends Block<FormType> {
  public constructor(events: EventType) {
    super('form', { events, elements: elems() });
  }

  public componentDidMount(): void {
    const { elements } = this.props;
    elements.pass.props.events = {
      blur: inputEvents.passBlur(elements.passHint),
      focus: inputEvents.inputFocus(elements.passHint),
    };
    elements.oldPass.props.events = {
      blur: inputEvents.passBlur(elements.oldPassHint),
      focus: inputEvents.inputFocus(elements.oldPassHint),
    };
    elements.passRepeat.props.events = {
      blur: inputEvents.passRepeatBlur(this.getContent() as HTMLFormElement, elements.passRepeatHint),
      focus: inputEvents.inputFocus(elements.passRepeatHint),
    };
  }

  public render(): string {
    const element = this.props.elements;
    return mainhbs({
      oldPass: element.oldPass.getContent().outerHTML,
      pass: element.pass.getContent().outerHTML,
      passRepeat: element.passRepeat.getContent().outerHTML,
      button: element.button.getContent().outerHTML,
      oldPassHint: element.oldPassHint.getContent().outerHTML,
      passHint: element.passHint.getContent().outerHTML,
      passRepeatHint: element.passRepeatHint.getContent().outerHTML,
    });
  }
}

export { PassForm };
