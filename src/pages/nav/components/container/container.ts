import '../../../../../.d';
import { Block } from '../../../../components/block';
import { ContainerType } from './types';
import mainhbs from './main.hbs';
import classes from '../../styles.module.scss';
import { router } from '../../../../utils/router';
import { Link } from '../../../../components/link/link';
import { ROUTES } from '../../../../utils/routeEnum';

class NavPage extends Block<ContainerType> {
  public constructor() {
    super('nav', {
      class: 'container',
      classes,
      elements: {
        enter: new Link(
          {
            text: 'Страница входа',
            class: 'link',
          },
          {
            click: () => router.go(ROUTES.ENTER),
          },
        ),
        reg: new Link(
          {
            text: 'Страница регистрации',
            class: 'link',
          },
          {
            click: () => router.go(ROUTES.REG),
          },
        ),
        main: new Link(
          {
            text: 'Главная страница',
            class: 'link',
          },
          {
            click: () => router.go(ROUTES.MAIN),
          },
        ),
        profile: new Link(
          {
            text: 'Стрница профиля',
            class: 'link',
          },
          {
            click: () => router.go(ROUTES.PROFILE),
          },
        ),
        pass: new Link(
          {
            text: 'Изменение пароля',
            class: 'link',
          },
          {
            click: () => router.go(ROUTES.PASS),
          },
        ),
        data: new Link(
          {
            text: 'Изменение данных',
            class: 'link',
          },
          {
            click: () => router.go(ROUTES.DATA),
          },
        ),
        page404: new Link(
          {
            text: '404',
            class: 'link',
          },
          {
            click: () => router.go(ROUTES.ROUTE404),
          },
        ),
        page500: new Link(
          {
            text: '500',
            class: 'link',
          },
          {
            click: () => router.go(ROUTES.ROUTE500),
          },
        ),
      },
    });
  }

  render() {
    const { elements } = this.props;
    return mainhbs({
      enter: elements.enter.getContent().outerHTML,
      reg: elements.reg.getContent().outerHTML,
      main: elements.main.getContent().outerHTML,
      profile: elements.profile.getContent().outerHTML,
      pass: elements.pass.getContent().outerHTML,
      data: elements.data.getContent().outerHTML,
      page404: elements.page404.getContent().outerHTML,
      page500: elements.page500.getContent().outerHTML,
    });
  }
}

export { NavPage };
