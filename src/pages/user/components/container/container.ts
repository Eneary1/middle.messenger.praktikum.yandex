import '../../../../../.d';
import { Block } from '../../../../components/block';
import { ContainerType } from './types';
import { Link } from '../../../../components/link/link';
import mainhbs from './main.hbs';
import { ROUTES } from '../../../../utils/hash_enum';
import * as classes from '../../styles.module.scss';
import { router } from '../../../../utils/router';

function dataFunc() {
  router.go(ROUTES.DATA);
}

function passFunc() {
  router.go(ROUTES.PASS);
}

function exitFunc() {
  router.go(ROUTES.MAIN);
}

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
      dataLink: elements.dataLink.getContent().outerHTML,
      passLink: elements.passLink.getContent().outerHTML,
      exitLink: elements.exitLink.getContent().outerHTML,
    });
  }
}

export { UserPage };
