import '../../../../../.d';
import { Block } from '../../../../components/block';
import { ContainerType } from './types';
import { Link } from '../../../../components/link/link';
import mainhbs from './main.hbs';
import {
  baseURL, PATHS, ROUTES, xhrContentType,
} from '../../../../utils/routeEnum';
import classes from '../../styles.module.scss';
import { router } from '../../../../utils/router';
import { NewFetch } from '../../../../utils/newFetch';
import { Avatar } from '../../../../components/avatar/avatar';
import { modalInstance } from '../../../../components/modal/modal';
import Handlebars from 'handlebars';

const newFetch = new NewFetch();

function dataFunc() {
  router.go(ROUTES.DATA);
}

function passFunc() {
  router.go(ROUTES.PASS);
}

function exitFunc() {
  newFetch.post(`${baseURL}${PATHS.LOGOUT}`, {
    headers: xhrContentType,
  }).then(() => {
    router.refresh(ROUTES.ENTER);
  }).catch(() => { console.log('Пользователя не существует или он уже вошёл'); });
}

let userData: { [x: string]: string };
newFetch.get(`${baseURL}${PATHS.USER}`)
  .then((a) => { userData = JSON.parse(a.response); })
  .catch(() => { console.log('Пользователя не существует или он уже вошёл'); });

class UserPage extends Block<ContainerType> {
  public constructor() {
    super('div', {
      classes,
      class: 'container',
      userData,
      elements: {
        dataLink: new Link(
          {
            text: 'Изменить данные',
            class: 'link',
          },
          {
            click: dataFunc,
          },
        ),
        passLink: new Link(
          {
            text: 'Изменить пароль',
            class: 'link',
          },
          {
            click: passFunc,
          },
        ),
        exitLink: new Link(
          {
            text: 'Выйти из аккаунта',
            class: 'exit',
          },
          {
            click: exitFunc,
          },
        ),
        avatar: new Avatar({
          class: 'profile__icon avatar',
          src: window.avatar,
        }),
        goToMain: new Link(
          {
            text: 'Назад к чатам',
            class: 'exit',
          },
          {
            click: () => { router.go(ROUTES.MAIN); },
          },
        ),
      },
    });
  }

  public componentDidMount(): void {
    this.props.elements.avatar.setProps({
      events: {
        click: () => {
          modalInstance.setProps({
            type: 'avatar',
            events: {
              submit: async (e) => {
                e.preventDefault();
                await newFetch.put(`${baseURL}${PATHS.PROFILE}${PATHS.AVATAR}`, { data: new FormData(e.target) });
                await newFetch.get(`${baseURL}${PATHS.USER}`)
                  .then((a) => {
                    userData = JSON.parse(a.response);
                    window.avatar = userData.avatar;
                  })
                  .catch(() => { console.log('Аватар не удалось загрузить'); });
                this.props.elements.avatar.setProps({
                  src: window.avatar,
                });
                const pass = router.getRoute(ROUTES.PASS);
                if (pass.block) {
                  pass.block.update();
                }
              },
            },
          });
          modalInstance.show();
        },
      },
    });
  }

  public componentDidUpdate(oldProps: ContainerType, newProps: ContainerType): boolean {
    (async () => {
      await newFetch.get(`${baseURL}${PATHS.USER}`)
        .then((a) => {
          userData = JSON.parse(a.response);
        })
        .catch(() => { console.log('Профиль не удалось загрузить'); });
    })();
    return true;
  }

  public render(): string {
    const { elements } = this.props;
    return Handlebars.compile(mainhbs)({
      login: this.props.userData.login,
      email: this.props.userData.email,
      phone: this.props.userData.phone,
      first_name: this.props.userData.first_name,
      second_name: this.props.userData.second_name,
      display_name: this.props.userData.display_name,
      avatar: elements.avatar.getContent().outerHTML,
      dataLink: elements.dataLink.getContent().outerHTML,
      passLink: elements.passLink.getContent().outerHTML,
      exitLink: elements.exitLink.getContent().outerHTML,
      goToMain: elements.goToMain.getContent().outerHTML,
    });
  }
}

export { UserPage };
