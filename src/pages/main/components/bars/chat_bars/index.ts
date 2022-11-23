import '../../../../../../.d';
import { Block } from '../../../../../components/block';
import mainhbs from './main.hbs';
import * as classes from '../../../styles.module.scss';

type ChatBarsType = {
  class: string,
  classes: object,
  elements?: any
};

class ChatBars extends Block<ChatBarsType> {
  public constructor() {
    super('div', {
      class: 'chat-list__list-container',
      classes: classes
    });
  }

  public render(): string {
    let usersObject: any = ""
    if (this.props.elements) {
      usersObject = {bars: Object.keys(this.props.elements).map((a: any)=>{
      return {
        bar: this.props.elements[a].getContent().outerHTML
      };
    })}
  }
    return mainhbs(usersObject);
  }
}

export {ChatBars};
