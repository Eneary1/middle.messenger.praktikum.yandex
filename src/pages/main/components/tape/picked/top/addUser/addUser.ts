import '../../../../../../../../.d';
import { Block } from '../../../../../../../components/block';
import { Link } from '../../../../../../../components/link/link';
import { Modal, modalInstance } from '../../../../../../../components/modal/modal';
import { NewFetch } from '../../../../../../../utils/newFetch';
import { ROUTES } from '../../../../../../../utils/routeEnum';
import { router } from '../../../../../../../utils/router';
import mainhbs from "./main.hbs"

type TopType = {
  class: string,
  elements: {
    addUser: Link,
    deleteUser: Link,
    deleteChat: Link
  }
};

class AddUser extends Block<TopType> {
  public constructor() {
    super('div', { class: 'add-user' , elements: {
      addUser: new Link({
        text: "Добавить пользователя"
      },
      {
        click: () => {
            modalInstance.setProps({
              events: {
                  submit: async (e: SubmitEvent) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement
                    const formData = new FormData(form)
                    if ((formData.get("dialog") as string).trim() === "") return;
                    else {
                      await new NewFetch().put(`https://ya-praktikum.tech/api/v2/chats/users`, {data: {
                        users: [
                          ((formData.get("dialog") as string))
                        ],
                        chatId: router.selectedChat()
                      },
                      headers: {
                        'Content-type': 'application/x-www-form-urlencoded'
                      }})
                    }
                  }
                }
              })
            modalInstance.show()
          }
        }),
      deleteUser: new Link({
        text: "Удалить пользователя"
      },
      {
        click: () => {
          modalInstance.setProps({
            events: {
                submit: async (e: SubmitEvent) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement
                  const formData = new FormData(form)
                  if ((formData.get("dialog") as string).trim() === "") return;
                  else {
                    await new NewFetch().delete(`https://ya-praktikum.tech/api/v2/chats/users`, {data: {
                      users: [
                        ((formData.get("dialog") as string))
                      ],
                      chatId: router.selectedChat()
                    },
                    headers: {
                      'Content-type': 'application/x-www-form-urlencoded'
                    }})
                  }
                }
              }
            })
          modalInstance.show()
        }
      }),
      deleteChat: new Link({
        text: "Удалить чат"
      }, 
      {
        click: async () => {
          await new NewFetch().delete("https://ya-praktikum.tech/api/v2/chats", {data: {
            chatId: router.selectedChat()
          },
          headers: {
            'Content-type': 'application/x-www-form-urlencoded'
          }})
          window.barsReload.forEach(a => {
            a()
          });
          router.noPushGo(ROUTES.MAIN)
        }
      })
    }});
  }

  public componentDidMount(): void {
    this.hide();
  }

  public render(): string {
    const elements = this.props.elements
    return mainhbs({
      addUser: elements.addUser.getContent().outerHTML,
      deleteUser: elements.deleteUser.getContent().outerHTML,
      deleteChat: elements.deleteChat.getContent().outerHTML
    });
  }
}

export { AddUser };
