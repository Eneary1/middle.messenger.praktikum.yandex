import '../../../.d';
import { Block } from '../block';
import { Input } from '../input/input';
import templateBase from './basic.hbs';
import templateAvatar from './avatar.hbs';
import { Button } from '../button/button';

type FormType = {
  class: string,
  text: string,
  type?: "avatar" | "basic"
  elements: {
    input: Input,
    buttonOk: Button,
    buttonCancel: Button,
    submitInput: Input
  }
};

class Modal extends Block<FormType> {
  public constructor() {
    super('form', { class: 'dialog', text: "", type: "basic", elements: {
      input: new Input({
        name: "dialog"
      }),
      buttonOk: new Button({
        type: "submit",
        text: "ОК",
      },
      {
        click: () => {this.hide()}
      }),
      buttonCancel: new Button({
        type: "button",
        text: "Отмена",
      },
      {
        click: () => {this.hide()}
      }),
      submitInput: new Input({
        type: "submit"
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
    const elements = this.props.elements
    if (this.props.type === "avatar") {
      return templateAvatar({
        buttonCancel: elements.buttonCancel.getContent().outerHTML,
        submitInput: elements.submitInput.getContent().outerHTML
      });
    } 
    else {
      return templateBase({
        input: elements.input.getContent().outerHTML,
        buttonOk: elements.buttonOk.getContent().outerHTML,
        buttonCancel: elements.buttonCancel.getContent().outerHTML,
        text: this.props.text
      });
    }
  }
}

const modalInstance = new Modal();

export { Modal, modalInstance };