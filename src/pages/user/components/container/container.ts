import '../../../../../.d';
import { Block } from '../../../../components/block';
import { ContainerType } from './types';
import { Link } from '../../../../components/link/link';
import mainhbs from './main.hbs';
import { ROUTES } from '../../../../utils/routeEnum';
import * as classes from '../../styles.module.scss';
import { router } from '../../../../utils/router';
import { NewFetch } from '../../../../utils/newFetch';

const newFetch = new NewFetch();

function dataFunc() {
  router.go(ROUTES.DATA);
}

function passFunc() {
  router.go(ROUTES.PASS);
}

function exitFunc() {
  newFetch.post("https://ya-praktikum.tech/api/v2/auth/logout", {
    headers: {
    'Content-type': 'application/x-www-form-urlencoded'
  }}).then(() => {
    router.refresh(ROUTES.ENTER)
  }).catch(()=>{console.log("Пользователя не существует или он уже вошёл")})
}

let userData: {[x: string]: string};
newFetch.get("https://ya-praktikum.tech/api/v2/auth/user")
  .then((a)=>{userData = JSON.parse(a.response)})
  .catch(()=>{})
  

class UserPage extends Block<ContainerType> {
  public constructor() {
    super('div', {
      classes: classes,
      class: 'container',
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
            text: 'Выйти',
            class: 'exit',
          },
          {
            click: exitFunc,
          },
        ),
      },
    });
  }

  public render(): string {
    const { elements } = this.props;
    return mainhbs({
      login: userData.login,
      email: userData.email,
      phone: userData.phone,
      first_name: userData.first_name,
      second_name: userData.second_name,
      dataLink: elements.dataLink.getContent().outerHTML,
      passLink: elements.passLink.getContent().outerHTML,
      exitLink: elements.exitLink.getContent().outerHTML,
    });
  }
}

export { UserPage };
