import '../../../../../../../.d';
import { Block } from '../../../../../../components/block';
import chat from './chat.hbs';
import * as classes from '../../../../styles.module.scss';
import { NewFetch } from '../../../../../../utils/newFetch';
import { router } from '../../../../../../utils/router';

type ChatElementType = {
  class: string,
  messages: ChatType | null,
  classes: object
};

class Chat extends Block<ChatElementType> {
  public constructor() {
    super('div', {
      class: 'message-tape__chat',
      messages: null,
      classes,
    });
  }

  public componentDidMount(): void {
    window.chat.push(this);
    window.chatUpdate.push(() => { this.update(); });
  }

  public componentDidUpdate(oldProps: ChatElementType, newProps: ChatElementType): boolean {
    this.getContent()?.scrollBy(0, this.getContent()!.scrollHeight);
    return true;
  }

  public render(): string {
    return chat(this.props.messages);
  }
}

export { Chat, ChatElementType };
