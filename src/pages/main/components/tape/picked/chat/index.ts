import '../../../../../../../.d';
import { Block } from '../../../../../../utils/block';
import chat from './chat.hbs';

class Chat extends Block {
  public constructor(moduleClass, template?: chatType) {
    super('div', { class: 'message-tape__chat', messages: template, moduleClass });
  }

  public componentDidMount(): void {
    this.modulateClasses(this.props.moduleClass);
  }

  public render(): string {
    return chat(this.props?.messages);
  }
}

export { Chat };
