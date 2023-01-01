import '../../../../../../../../.d';
import Handlebars from 'handlebars';
import { Block } from '../../../../../../../components/block';
import { Link } from '../../../../../../../components/link/link';
import { modalInstance } from '../../../../../../../components/modal/modal';
import { NewFetch } from '../../../../../../../utils/newFetch';
import {
  baseURL, PATHS, ROUTES, xhrContentType,
} from '../../../../../../../utils/routeEnum';
import { router } from '../../../../../../../utils/router';
import mainhbs from './main.hbs';

type TopType = {
  class: string,
  elements: {
    addUser: Link,
    deleteUser: Link,
    deleteChat: Link,
    chatAvatar: Link
  }
};

function submitEvent(method: 'delete' | 'put') {
  return async (e: SubmitEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    if ((formData.get('dialog') as string).trim() === '') return;

    await new NewFetch()[method](`${baseURL}${PATHS.CHATSUSERS}`, {
      data: {
        users: [
          ((formData.get('dialog') as string)),
        ],
        chatId: router.selectedChat(),
      },
      headers: xhrContentType,
    });
  };
}

class AddUser extends Block<TopType> {
  public constructor() {
    super('div', {
      class: 'add-user',
      elements: {
        addUser: new Link(
          {
            text: 'Добавить пользователя',
          },
          {
            click: () => {
              modalInstance.setProps({
                type: 'basic',
                text: 'ID пользователя:',
                events: {
                  submit: submitEvent('put'),
                },
              });
              modalInstance.show();
            },
          },
        ),
        deleteUser: new Link(
          {
            text: 'Удалить пользователя',
          },
          {
            click: () => {
              modalInstance.setProps({
                type: 'basic',
                text: 'ID пользователя:',
                events: {
                  submit: submitEvent('delete'),
                },
              });
              modalInstance.show();
            },
          },
        ),
        deleteChat: new Link(
          {
            text: 'Удалить чат',
          },
          {
            click: async () => {
              await new NewFetch().delete(`${baseURL}${PATHS.CHATS}`, {
                data: {
                  chatId: router.selectedChat(),
                },
                headers: xhrContentType,
              });
              window.barsReload();
              router.noPushGo(ROUTES.MAIN);
              (router.getRoute(ROUTES.MAIN).block.props as {bars: any}).bars = window.constBars;
            },
          },
        ),
        chatAvatar: new Link(
          {
            text: 'Обновить аватар',
          },
          {
            click: async () => {
              modalInstance.setProps({
                type: 'avatar',
                events: {
                  submit: async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    formData.append('chatId', router.selectedChat());
                    await new NewFetch().put(`${baseURL}${PATHS.CHATS}${PATHS.AVATAR}`, { data: formData });
                    window.barsReload();
                  },
                },
              });
              modalInstance.show();
            },
          },
        ),
      },
    });
  }

  public componentDidMount(): void {
    this.hide();
  }

  public render(): string {
    const { elements } = this.props;
    return Handlebars.compile(mainhbs)({
      addUser: elements.addUser.getContent().outerHTML,
      deleteUser: elements.deleteUser.getContent().outerHTML,
      chatAvatar: elements.chatAvatar.getContent().outerHTML,
      deleteChat: elements.deleteChat.getContent().outerHTML,
    });
  }
}

export { AddUser };
