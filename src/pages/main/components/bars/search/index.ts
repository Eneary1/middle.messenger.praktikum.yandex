import '../../../../../../.d';
import { Block } from '../../../../../components/block';
import { Link } from '../../../../../components/link/link';
import { modalInstance } from '../../../../../components/modal/modal';
import { NewFetch } from '../../../../../utils/newFetch';
import { baseURL, PATHS, ROUTES, xhrContentType } from '../../../../../utils/routeEnum';
import { router } from '../../../../../utils/router';
import { MainPage } from '../../../index';
import search from './search.hbs';

type SearchType = {
  class: string
  elements: {
    link: Link,
    chatAdd: Link
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
        click: () => {
          modalInstance.setProps({
            type: "basic",
            text: "Название чата:",
            events: {
              submit: async (e: SubmitEvent) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement
                const formData = new FormData(form)
                if ((formData.get("dialog") as string).trim() === "") return;
                else {
                  await new NewFetch().post(`${baseURL}${PATHS.CHATS}`, {
                    data: {
                      title: ((formData.get("dialog") as string))
                    },
                    headers: xhrContentType
                  })
                  await new NewFetch().get(`${baseURL}${PATHS.CHATS}`).then((a)=>{
                    return JSON.parse(a.response)
                  }).then((res)=>{
                    res.forEach((a) => {
                      router.use(`${ROUTES.MAIN}/${a.id}`, MainPage)
                    }); 
                  })
        
                  window.barsReload.forEach(a => {
                    a()
                  });
                }
              }
            }
          })
          modalInstance.show()
        }
      })
    }});
  }

  public render(): string {
    return search({
      link: this.props.elements.link.getContent().outerHTML,
      chatAdd: this.props.elements.chatAdd.getContent().outerHTML
    });
  }
}

export { SearchBars };
