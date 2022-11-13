import '../../../../../../../../.d';
import { Block } from '../../../../../../../components/block';
import { Input } from '../../../../../../../components/input/input';
import { FormType, ElemType } from './types';
import * as inputIvents from '../../../../../../../utils/inputEvents';

const elems: ElemType = {
  messageInput: new Input(
    {
      name: 'message',
      placeHolder: 'Сообщение',
    },
    {
      blur: inputIvents.messageBlur(),
      focus: inputIvents.inputFocus(),
    },
  ),
};

class MessageForm extends Block<FormType> {
  public constructor(events: EventType) {
    super('form', { class: 'input-handler', events, elements: { ...elems } });
  }

  public render(): string {
    return this.props.elements.messageInput.getContent().outerHTML;
  }
}

export { MessageForm };
