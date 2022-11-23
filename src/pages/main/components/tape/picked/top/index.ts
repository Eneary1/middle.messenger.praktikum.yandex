import '../../../../../../../.d';
import { Block } from '../../../../../../components/block';
import top from './top.hbs';
import { GripContainer } from './gripContainer/gripContainer';
import { NewFetch } from '../../../../../../utils/newFetch';
import { router } from '../../../../../../utils/router';
import * as classes from "../../../../styles.module.scss"

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
      classes: classes,
      elements: {
        gripContainer: new GripContainer({
          click: () => {
            this.props.elements.gripContainer.props.elements.addUser.toggle();
          },
        })
      },
    });
  }

  public componentDidMount(): void {
    if (!router.selectedChat()) return;
    new NewFetch().get("https://ya-praktikum.tech/api/v2/chats").then((a) => {
      const arr: Array<any> = JSON.parse(a.response)
      this.setProps({
        elements: {...this.props.elements, chatName: (arr.find((b) => b.id == router.selectedChat())).title}
      })
    })
  }

  public render(): string {
    return top({
      chatName: this.props.elements.chatName ? this.props.elements.chatName : "",
      gripContainer: this.props.elements.gripContainer.getContent().outerHTML,
    });
  }
}

export { Top };
