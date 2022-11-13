import '../../../../../../../.d';
import { Block } from '../../../../../../components/block';
import bottom from './bottom.hbs';
import * as classes from '../../../../styles.module.scss';
import { AttachmentContainer } from './attachContainer/attachContainer';
import { MessageForm } from './form/form';
import { submitCheck } from '../../../../../../utils/inputEvents';

type BottomType = {
  class: string,
  elements: {
    attachmentContainer: AttachmentContainer,
    messageForm: MessageForm
  }
};

class Bottom extends Block<BottomType> {
  public constructor() {
    super('div', {
      class: 'message-tape__bottom',
      elements: {
        attachmentContainer: new AttachmentContainer({
          click: () => {
            this.props.elements.attachmentContainer.props.elements.Attachment.toggle();
          },
        }),
        messageForm: new MessageForm({
          submit(e: SubmitEvent) {
            if (submitCheck(e)) {
              console.log('Сообщение отправлено');
            }
          },
        }),
      },
    });
  }

  public componentDidMount(): void {
    this.modulateClasses(classes);
  }

  public render(): string {
    return bottom({
      attachmentContainer: this.props.elements.attachmentContainer.getContent().outerHTML,
      messageForm: this.props.elements.messageForm.getContent().outerHTML,
    });
  }
}

export { Bottom };
