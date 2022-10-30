import '../../../../../.d';
import { Block } from '../../../../utils/block';
import { ChatList } from './picked/index';
import { BarUnpicked } from './unpicked/index';

class MessageTape extends Block {
  public constructor(moduleClass, chat?: chatType) {
    super('main', {
      class: 'message-tape',
      moduleClass,
      messages: chat,
      elements: {
        picked: new ChatList(moduleClass),
        unpicked: new BarUnpicked(moduleClass),
      },
    });
  }

  public componentDidMount(): void {
    this.modulateClasses(this.props.moduleClass);
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
      this.props.elements.picked.modulateClasses(this.props.moduleClass);
    } else {
      this.props.elements.unpicked.modulateClasses(this.props.moduleClass);
    }

    return this.props.messages
      ? this.props.elements.picked.getContent().outerHTML
      : this.props.elements.unpicked.getContent().outerHTML;
  }
}

export { MessageTape };
