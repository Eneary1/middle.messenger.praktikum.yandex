import '../../../../../../.d';
import { Block } from '../../../../../components/block';
import mainhbs from './main.hbs';
import classes from '../../../styles.module.scss';
import Handlebars from 'handlebars';

type ChatBarsType = {
  class: string,
  classes: object,
  elements?: any
};

class ChatBars extends Block<ChatBarsType> {
  public constructor() {
    super('div', {
      class: 'chat-list__list-container',
      classes,
    });
  }

  public render(): string {
    let usersObject: any = '';
    if (this.props.elements) {
      usersObject = {
        bars: Object.keys(this.props.elements).map((a: any) => ({
          bar: this.props.elements[a].getContent().outerHTML,
        })),
      };
    }
    return Handlebars.compile(mainhbs)(usersObject);
  }
}

export { ChatBars };
