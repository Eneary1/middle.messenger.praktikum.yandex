import '../../../../../../../.d';
import { Block } from '../../../../../../components/block';
import { Input } from '../../../../../../components/input/input';
import mainhbs from './main.hbs';
import * as classes from "../../../../styles.module.scss"
import { NewFetch } from '../../../../../../utils/newFetch';
import { router } from '../../../../../../utils/router';
import { ROUTES } from '../../../../../../utils/routeEnum';
import { MainPage } from '../../../../index';
import { Button } from '../../../../../../components/button/button';

type FormType = {
  class: string,
  classes: object,
  elements: {
    input: Input,
    buttonOk: Button,
    buttonCancel: Button
  }
  events: EventType
};

class ModalForm extends Block<FormType> {
  public constructor() {
    super('form', { class: 'chat-list__add-dialog', classes: classes, elements: {
      input: new Input({
        name: "dialog"
      }),
      buttonOk: new Button({
        type: "submit",
        text: "ОК",
      }),
      buttonCancel: new Button({
        type: "button",
        text: "Отмена",
      },
      {
        click: () => {this.hide()}
      })
    },
    events: {
      submit: async (e: SubmitEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement
        const formData = new FormData(form)
        if ((formData.get("dialog") as string).trim() === "") return;
        else {
          await new NewFetch().post(`https://ya-praktikum.tech/api/v2/chats`, {data: {
            title: ((formData.get("dialog") as string))
          },
          headers: {
            'Content-type': 'application/x-www-form-urlencoded'
          }})
          await new NewFetch().get("https://ya-praktikum.tech/api/v2/chats").then((a)=>{
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
    }});
  }

  public componentDidMount(): void {
	  this.hide();
  }

  public render(): string {
    return mainhbs({
      input: this.props.elements.input.getContent().outerHTML,
      buttonOk: this.props.elements.buttonOk.getContent().outerHTML,
      buttonCancel: this.props.elements.buttonCancel.getContent().outerHTML
    });
  }
}

export { ModalForm };
