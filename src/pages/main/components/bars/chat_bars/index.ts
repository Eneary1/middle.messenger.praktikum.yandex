import '../../../../../../.d';
import { Block } from '../../../../../utils/block';
import chatBarTmpl from './chat-bar.hbs';

class ChatBars extends Block {
  public constructor(template?: Object) {
    super('div', { class: 'chat-list__list-container', template });
  }

  public render(): string {
    return chatBarTmpl(this.props.template ? this.props.template : '');
  }
}

export { ChatBars };
