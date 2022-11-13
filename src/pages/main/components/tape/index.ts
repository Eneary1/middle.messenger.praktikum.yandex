import '../../../../../.d';
import { Block } from '../../../../components/block';
import { ChatList } from './picked/index';
import { BarUnpicked } from './unpicked/index';
import * as classes from '../../styles.module.scss';

type TapeType = {
  class: string,
  messages: ChatType
  elements: {
    picked: ChatList,
    unpicked: BarUnpicked,
  }
};

class MessageTape extends Block<TapeType> {
  public constructor(messages?: ChatType) {
    super('main', {
      class: 'message-tape',
      messages,
      elements: {
        picked: new ChatList(),
        unpicked: new BarUnpicked(),
      },
    });
  }

  public render(): string {
    if (this.props.messages) {
      this.props.elements.picked.modulateClasses(classes);
    } else {
      this.props.elements.unpicked.modulateClasses(classes);
    }

    return this.props.messages
      ? this.props.elements.picked.getContent().outerHTML
      : this.props.elements.unpicked.getContent().outerHTML;
  }
}

export { MessageTape };
