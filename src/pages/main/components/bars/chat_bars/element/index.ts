import '../../../../../../../.d';
import { Block } from '../../../../../../components/block';
import { ROUTES } from '../../../../../../utils/routeEnum';
import { router } from '../../../../../../utils/router';
import mainhbs from './main.hbs';
import * as classes from "../../../../styles.module.scss"
import { Avatar } from '../../../../../../components/avatar/avatar';

type Obj = {[x: string]: string};

type BarType = {
  class: string,
  tmplObject: Obj,
  events: EventType,
  classes: object,
  elements: {
    avatar: Avatar
  }
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
        if (window.socket.socket) window.socket.socket.close();
        window.socket.socketChange();
      }
		},
    elements: {
      avatar: new Avatar({
        src: "",
        class: "element__icon avatar"
      })
    }
    });
  }

  public render(): string {
    const { id, last_message, avatar } = this.props.tmplObject
    this.props.elements.avatar.setProps({
      src: avatar
    })
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
    
    return mainhbs({...this.props.tmplObject, avatar: this.props.elements.avatar.getContent().outerHTML});
  }
}

export { Bar };