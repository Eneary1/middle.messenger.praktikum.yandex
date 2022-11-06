import '../../../../../../../.d';
import { Block } from '../../../../../../components/block';
import chat from './chat.hbs';
import * as classes from '../../../../styles.module.scss';

type ChatElementType = {
  class: string,
  messages: ChatType
};

class Chat extends Block<ChatElementType> {
  public constructor(messages?: ChatType) {
    super('div', { class: 'message-tape__chat', messages });
  }

  public componentDidMount(): void {
    this.modulateClasses(classes);
  }

  public render(): string {
    return chat(this.props?.messages);
  }
}

export { Chat, ChatElementType };
