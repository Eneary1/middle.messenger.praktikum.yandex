import '../../../../../../../../.d';
import { Block } from '../../../../../../../components/block';
import { Input } from '../../../../../../../components/input/input';
import { FormType, ElemType } from './types';
import { Button } from '../../../../../../../components/button/button';
import { AttachmentContainer } from '../attachContainer/attachContainer';
import mainhbs from "./main.hbs"

class MessageForm extends Block<FormType> {
  public constructor(events?: EventType) {
      super('form', { 
        class: 'input-handler', events, 
        elements: {
          messageInput: new Input(
            {
              name: 'message',
              placeHolder: 'Сообщение',
            }
          ),
          button: new Button({
            type: "submit"
          }),
          attachment: new AttachmentContainer({
            click: () => {
              console.log(this)
              this.props.elements.attachment.props.elements.Attachment.toggle();
            }
          })
        }
    });
  }

  public render(): string {
    const elements = this.props.elements
    return mainhbs({
      input: elements.messageInput.getContent().outerHTML,
      attachment: elements.button.getContent().outerHTML,
      button: elements.attachment.getContent().outerHTML
    });
  }
}

export { MessageForm };
