import '../../../../../../../.d';
import { Block } from '../../../../../../components/block';
import { ROUTES } from '../../../../../../utils/routeEnum';
import { router } from '../../../../../../utils/router';
import mainhbs from './main.hbs';
import * as classes from "../../../../styles.module.scss"

type Obj = {[x: string]: string};

type BarType = {
  class: string,
  tmplObject: Obj,
  events: EventType,
  classes: object
};


class Bar extends Block<BarType> {
  public constructor(templateObject: Obj) {
    super('div', {
		class: 'chat-list__list-element',
    classes: classes,
		tmplObject: templateObject,
		events: {
			click: (e: Event) => {
        const targ: Element = e.target as Element
        if (router.selectedChat() && targ.classList.contains(classes["checked"])) {
          router.go(ROUTES.MAIN) 
          window.barsReload.forEach((a) => { a() })
          return
        }
        router.go(`${ROUTES.MAIN}/${templateObject.id}`)
        window.socket.socket.close();
        window.socket.socketChange();
        window.socket.socket.close();
      }
		}
    });
  }

  public render(): string {
    const { id, last_message } = this.props.tmplObject
    const pathNumb = router.selectedChat();
    if (pathNumb)
    {
      if (pathNumb == id) {
        this.getContent().classList.add(classes["checked"])
      }
    }
    let objTimeRef = last_message as unknown as {time: string}
    if (objTimeRef)
    {
      objTimeRef.time = objTimeRef.time.toString().match(/\d\d:\d\d/)[0]
    }
    return mainhbs(this.props.tmplObject);
  }
}

export { Bar };