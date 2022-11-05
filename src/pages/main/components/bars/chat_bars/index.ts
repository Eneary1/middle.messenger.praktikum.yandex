import '../../../../../../.d';
import { Block } from '../../../../../components/block';
import chatBarTmpl from './chat-bar.hbs';

type ChatBarsType = {
  class: string,
  template: TemplateType
}

class ChatBars extends Block<ChatBarsType> {
  public constructor(templateObject?: Object) {
    super('div', { class: 'chat-list__list-container', template: {
      templator: chatBarTmpl, 
      tmplObject: templateObject
    }});
  }

  public render(): string {
    const tmpl = this.props.template
    return tmpl.templator(tmpl.tmplObject ? tmpl.tmplObject : '');
  }
}

export { ChatBars };
