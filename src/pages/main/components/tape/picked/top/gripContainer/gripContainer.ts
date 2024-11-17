import Handlebars from 'handlebars';
import '../../../../../../../../.d';
import { Block } from '../../../../../../../components/block';
import { AddUser } from '../addUser/addUser';
import mainhbs from './main.hbs';

type TopType = {
  class: string,
  events: EventType,
  elements: {
    addUser: AddUser
  }
};

class GripContainer extends Block<TopType> {
  public constructor(events?: EventType) {
    super('div', {
      class: 'grip-container',
      events,
      elements: {
        addUser: new AddUser(),
      },
    });
  }

  public render(): string {
    return Handlebars.compile(mainhbs)({
      addUser: this.props.elements.addUser.getContent().outerHTML,
    });
  }
}

export { GripContainer };
