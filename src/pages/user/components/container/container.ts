import '../../../../../.d';
import { Block } from '../../../../components/block';
import { ContainerType } from './types';
import { Link } from '../../../../components/link/link';
import mainhbs from './main.hbs';
import { routeFunc } from '../../../../utils/route_func';
import { HASHES } from '../../../../utils/hash_enum';

function dataFunc() {
  routeFunc(HASHES.DATA);
}

function passFunc() {
  routeFunc(HASHES.PASS);
}

function exitFunc() {
  routeFunc(HASHES.MAIN);
}

class Container extends Block<ContainerType> {
  public constructor() {
    super('div', {
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

  public componentDidMount(): void {
    const formElements = this.props.elements;
    for (let i of Object.keys(formElements)) {
      formElements[i].addEvents(this.getContent());
    }
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

export { Container };
