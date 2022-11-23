import '../../../../../.d';
import { Block } from '../../../../components/block';
import { ContainerType } from './types';
import { ROUTES } from '../../../../utils/routeEnum';
import mainhbs from './main.hbs';
import * as classes from '../../styles.module.scss';
import { Link } from '../../../../components/link/link';
import { router } from '../../../../utils/router';

 class Page404 extends Block<ContainerType> {
  public constructor() {
    super('div', { class: 'container', classes: classes, elements: {
      link: new Link({
        text: "Назад к чатам",
        class: "link" 
      }, 
      {
        click: () => router.go(ROUTES.MAIN)
      })
    }});
  }

  render() {
    return mainhbs({
      link: this.props.elements.link.getContent().outerHTML
    });
  }
}

export { Page404 };
