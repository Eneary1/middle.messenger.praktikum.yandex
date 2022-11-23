import '../../../.d';
import { Block } from '../block';
import { Input } from '../input/input';
import mainhbs from './main.hbs';
import * as classes from ".styles.module.scss"
import { NewFetch } from '../../utils/newFetch';
import { router } from '../../utils/router';
import { Button } from '../button/button';

type FormType = {
  class: string,
  elements: {
    input: Input,
    buttonOk: Button,
    buttonCancel: Button
  }
};

class Modal extends Block<FormType> {
  public constructor() {
    super('form', { class: 'dialog', elements: {
      input: new Input({
        name: "dialog"
      }),
      buttonOk: new Button({
        type: "submit",
        text: "ОК",
      }),
      buttonCancel: new Button({
        type: "button",
        text: "Отмена",
      },
      {
        click: () => {this.hide()}
      })
    }});
  }

  public componentDidMount(): void {
	  this.hide();
  }

  public render(): string {
	
    return mainhbs({
      input: this.props.elements.input.getContent().outerHTML,
      buttonOk: this.props.elements.buttonOk.getContent().outerHTML,
      buttonCancel: this.props.elements.buttonCancel.getContent().outerHTML
    });
  }
}

const modalInstance = new Modal();

export { Modal, modalInstance };