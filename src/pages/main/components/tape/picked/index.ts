import '../../../../../../.d';
import { Block } from '../../../../../components/block';
import { Top } from './top/index';
import { Chat } from './chat/index';
import { Bottom } from './bottom/index';
import mainhbs from './main.hbs';
import Handlebars from 'handlebars';

type ChatListType = {
  class?: string,
  elements?: {
    top?: Top,
    chat?: Chat,
    bottom?: Bottom
  },
  messages?: ChatType
};

class ChatList extends Block<ChatListType> {
  public constructor() {
    super('div', {
      class: 'message-tape_picked',
      elements: {
        top: new Top(),
        chat: new Chat(),
        bottom: new Bottom(),
      },
    });
  }

  public render(): string {
    const { elements } = this.props;
    return Handlebars.compile(mainhbs)({
      top: elements.top ? elements.top.getContent().outerHTML : '',
      chat: elements.chat ? elements.chat.getContent().outerHTML : '',
      bottom: elements.bottom ? elements.bottom.getContent().outerHTML : '',
    });
  }
}

export { ChatList };
