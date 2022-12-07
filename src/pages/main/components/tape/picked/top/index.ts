import '../../../../../../../.d';
import Handlebars from 'handlebars';
import { Block } from '../../../../../../components/block';
import top from './top.hbs';
import { GripContainer } from './gripContainer/gripContainer';
import { NewFetch } from '../../../../../../utils/newFetch';
import { router } from '../../../../../../utils/router';
import classes from '../../../../styles.module.scss';
import { baseURL, PATHS } from '../../../../../../utils/routeEnum';

type TopType = {
  class: string,
  classes: object,
  elements: {
    gripContainer: GripContainer,
    chatName?: string
  }
};

class Top extends Block<TopType> {
  public constructor() {
    super('div', {
      class: 'message-tape__top',
      classes,
      elements: {
        gripContainer: new GripContainer({
          click: () => {
            this.props.elements.gripContainer.props.elements.addUser.toggle();
          },
        }),
      },
    });
  }

  public componentDidMount(): void {
    if (!router.selectedChat()) return;
    new NewFetch().get(`${baseURL}${PATHS.CHATS}`).then((a) => {
      const arr: Array<any> = JSON.parse(a.response);
      const found = arr.find((b) => b.id == router.selectedChat());
      if (!found) return;
      this.setProps({
        elements: { ...this.props.elements, chatName: (found).title },
      });
    }).catch((a) => { console.log('Не удалось загрузить чаты'); });
  }

  public render(): string {
    return Handlebars.compile(top)({
      chatName: this.props.elements.chatName ? this.props.elements.chatName : '',
      gripContainer: this.props.elements.gripContainer.getContent().outerHTML,
    });
  }
}

export { Top };
