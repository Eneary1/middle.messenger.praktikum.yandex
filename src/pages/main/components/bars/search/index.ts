import '../../../../../../.d';
import Handlebars from 'handlebars';
import { Block } from '../../../../../components/block';
import { Input } from '../../../../../components/input/input';
import { Link } from '../../../../../components/link/link';
import { modalInstance } from '../../../../../components/modal/modal';
import { NewFetch } from '../../../../../utils/newFetch';
import {
  baseURL, PATHS, ROUTES, xhrContentType,
} from '../../../../../utils/routeEnum';
import { router } from '../../../../../utils/router';
import { MainPage } from '../../../index';
import search from './search.hbs';

type SearchType = {
  class: string
  elements: {
    input: Input
    link: Link,
    chatAdd: Link
  }
};

class SearchBars extends Block<SearchType> {
  public constructor() {
    super('div', {
      class: 'chat-list__search-bar',
      elements: {
        input: new Input(
          {
            placeHolder: 'Поиск',
          },
          {
            keyup(e: KeyType) {
              window.barsReload.forEach((a) => {
                a(this.value);
              });
            },
          },
        ),
        link: new Link(
          {
            text: 'Профиль',
            class: 'profile',
          },
          {
            click: () => { router.go(ROUTES.PROFILE); },
          },
        ),
        chatAdd: new Link(
          {
            text: 'Добавить чат',
            class: 'chat-add',
          },
          {
            click: () => {
              modalInstance.setProps({
                type: 'basic',
                text: 'Название чата:',
                events: {
                  submit: async (e: SubmitEvent) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const formData = new FormData(form);
                    if ((formData.get('dialog') as string).trim() === '') return;

                    await new NewFetch().post(`${baseURL}${PATHS.CHATS}`, {
                      data: {
                        title: ((formData.get('dialog') as string)),
                      },
                      headers: xhrContentType,
                    }).catch((a) => { console.log('Что-то пошло не так'); });
                    await new NewFetch().get(`${baseURL}${PATHS.CHATS}`).then((a) => JSON.parse(a.response)).then((res) => {
                      res.forEach((a) => {
                        router.use(`${ROUTES.MAIN}/${a.id}`, MainPage);
                      });
                    })
                      .catch((a) => { console.log('Не удалось получить чаты'); });

                    window.barsReload.forEach((a) => {
                      a();
                    });
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

  public render(): string {
    const { elements } = this.props;
    return Handlebars.compile(search)({
      link: elements.link.getContent().outerHTML,
      chatAdd: elements.chatAdd.getContent().outerHTML,
      input: elements.input.getContent().outerHTML,
    });
  }
}

export { SearchBars };
