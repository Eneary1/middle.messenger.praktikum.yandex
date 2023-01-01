import '../../../../../../../.d';
import Handlebars from 'handlebars';
import { Block } from '../../../../../../components/block';
import { PATHS, ROUTES } from '../../../../../../utils/routeEnum';
import { router } from '../../../../../../utils/router';
import mainhbs from './main.hbs';
import classes from '../../../../styles.module.scss';
import { Avatar } from '../../../../../../components/avatar/avatar';

type Obj = { [x: string]: string };

type BarType = {
  class: string,
  tmplObject: Obj,
  events: EventType,
  classes: { [x: string]: unknown },
  elements: {
    avatar: Avatar
  }
};

class Bar extends Block<BarType> {
  public constructor(templateObject: Obj) {
    super('div', {
      class: 'chat-list__list-element',
      classes,
      tmplObject: templateObject,
      events: {
        click: (e: Event) => {
          const targ: Element = e.target as Element;
          if (router.selectedChat() && targ.classList.contains(classes.checked)) {
            router.go(ROUTES.MAIN);
            (router.getRoute(ROUTES.MAIN).block.props as {bars: any}).bars = window.constBars;
            return;
          }
          router.go(`${ROUTES.MAIN}/${templateObject.id}`);
          if (window.socket.socket) window.socket.socket.close();
          (router.getRoute(`${location.pathname}`).block.props as {bars: any}).bars = window.constBars;
          window.socket.socketChange();
        },
      },
      elements: {
        avatar: new Avatar({
          src: '',
          class: 'element__icon avatar',
        }),
      },
    });
  }

  public render(): string {
    const { id, last_message, avatar } = this.props.tmplObject;
    this.props.elements.avatar.setProps({
      src: avatar,
    });
    const pathNumb = router.selectedChat();
    if (pathNumb) {
      if (pathNumb == id) {
        this.getContent().classList.add(classes.checked);
      }
    }
    let objTimeRef = last_message as unknown as { time: string };
    if (objTimeRef) {
      objTimeRef.time = objTimeRef.time.toString().match(/\d\d:\d\d/)[0];
    }
    return Handlebars.compile(mainhbs)({ ...this.props.tmplObject, avatar: this.props.elements.avatar.getContent().outerHTML });
  }
}

export { Bar };
