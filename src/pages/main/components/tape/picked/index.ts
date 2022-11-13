import '../../../../../../.d';
import { Block } from '../../../../../components/block';
import { Top } from './top/index';
import { Chat, ChatElementType } from './chat/index';
import { Bottom } from './bottom/index';

type ChatListType = {
  class?: string,
  elements?: {
    top: Top,
    chat: Chat,
    bottom: Bottom
  },
  messages?: ChatType
};

class ChatList extends Block<ChatListType> {
  public constructor(messages?: ChatType) {
    super('div', {
      class: 'message-tape_picked',
      elements: {
        top: new Top(),
        chat: new Chat(messages),
        bottom: new Bottom(),
      },
    });
  }

  public render(): string {
    const { elements } = this.props;
    return `
		${elements.top.getContent().outerHTML}
		${elements.chat.getContent().outerHTML}
		${elements.bottom.getContent().outerHTML}
		`;
  }
}

export { ChatList };
