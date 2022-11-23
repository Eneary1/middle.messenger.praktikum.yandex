import '../../../../../.d';
import { Block } from '../../../../components/block';
import { ChatList } from './picked/index';
import { BarUnpicked } from './unpicked/index';
import * as classes from '../../styles.module.scss';
import { router } from '../../../../utils/router';

type TapeType = {
  class: string,
  messages: ChatType
  elements: {
    picked: ChatList,
    unpicked: BarUnpicked,
  },
  classes: object
};

class MessageTape extends Block<TapeType> {
  public constructor(messages?: ChatType) {
    super('main', {
      class: 'message-tape',
      messages,
      elements: {
        picked: new ChatList(),
        unpicked: new BarUnpicked(),
      },
      classes: classes
    });
  }

  public render(): string {
    if (router.selectedChat()) 
    return this.props.elements.picked.getContent().outerHTML; 
    else return this.props.elements.unpicked.getContent().outerHTML;
  }
}

export { MessageTape };
