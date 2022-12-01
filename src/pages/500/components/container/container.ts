import '../../../../../.d';
import { Block } from '../../../../components/block';
import { ContainerType } from './types';
import { ROUTES } from '../../../../utils/routeEnum';
import mainhbs from './main.hbs';
import classes from '../../styles.module.scss';
import { Link } from '../../../../components/link/link';
import { router } from '../../../../utils/router';

class Page500 extends Block<ContainerType> {
  public constructor() {
    super('div', {
      class: 'container',
      classes,
      elements: {
        link: new Link(
          {
            text: 'Назад к чатам',
            class: 'link',
          },
          {
            click: () => router.go(ROUTES.MAIN),
          },
        ),
      },
    });
  }

  render() {
    return mainhbs({
      link: this.props.elements.link.getContent().outerHTML,
    });
  }
}

export { Page500 };
