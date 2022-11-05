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
}

class MessageTape extends Block<TapeType> {
  public constructor(chat?: ChatType) {
    super('main', {
      class: 'message-tape',
      messages: chat,
      elements: {
        picked: new ChatList(),
        unpicked: new BarUnpicked(),
      },
    });
  }

  public componentDidMount(): void {
    this.modulateClasses(classes);
    this.props.elements.picked.props.messages = this.props.messages;
    this.props.elements.picked.setProps({
      messages: this.props.messages,
    });
  }

  public componentDidUpdate(oldProps: object, newProps: object): boolean {
    this.props.elements.picked.setProps({
      messages: this.props.messages,
    });
    return true;
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

export { MessageTape, TapeType };
