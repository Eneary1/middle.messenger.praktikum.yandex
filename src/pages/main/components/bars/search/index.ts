import '../../../../../../.d';
import { Block } from '../../../../../components/block';
import { Link } from '../../../../../components/link/link';
import { ROUTES } from '../../../../../utils/routeEnum';
import { router } from '../../../../../utils/router';
import { ModalForm } from './modal/index';
import search from './search.hbs';

type SearchType = {
  class: string
  elements: {
    link: Link,
    chatAdd: Link,
    modal?: ModalForm
  }
};

class SearchBars extends Block<SearchType> {
  public constructor() {
    super('div', { class: 'chat-list__search-bar', elements: {
      link: new Link({
        text: "Профиль",
        class: "profile"
      },
      {
        click: () => {router.go(ROUTES.PROFILE)}
      }),
      chatAdd: new Link({
        text: "Добавить чат",
        class: "chat-add"
      },
      {
        click: () => {this.props.elements.modal.toggle()}
      })
    }});
  }

  public render(): string {
    return search({
      link: this.props.elements.link.getContent().outerHTML,
      chatAdd: this.props.elements.chatAdd.getContent().outerHTML,
      modal: this.props.elements.modal ? this.props.elements.modal.getContent().outerHTML : ""
    });
  }
}

export { SearchBars };
