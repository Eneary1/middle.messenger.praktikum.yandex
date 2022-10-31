import '../../../../../../.d';
import { Block } from '../../../../../utils/block';
import { Top } from './top/index';
import { Chat } from './Chat/index';
import { Bottom } from './Bottom/index';

class ChatList extends Block {
  public constructor(moduleClass: Object, chat?: chatType) {
    super('div', {
      class: 'message-tape_picked',
      moduleClass,
      elements: {
        top: new Top(moduleClass),
        chat: new Chat(moduleClass, chat),
        bottom: new Bottom(moduleClass),
      },
    });
  }

  public componentDidUpdate(oldProps: object, newProps: object): boolean {
    this.props.elements.chat.setProps({
      messages: this.props.messages,
    });
    return true;
  }

  public render(): string {
    this.props.elements.top.modulateClasses(this.props.moduleClass);
    this.props.elements.chat.modulateClasses(this.props.moduleClass);
    this.props.elements.bottom.modulateClasses(this.props.moduleClass);
    return `
		${this.props.elements.top.getContent().outerHTML}
		${this.props.elements.chat.getContent().outerHTML}
		${this.props.elements.bottom.getContent().outerHTML}
		`;
  }
}

export { ChatList };
