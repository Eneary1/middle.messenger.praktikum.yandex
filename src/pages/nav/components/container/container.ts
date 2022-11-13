import '../../../../../.d';
import { Block } from '../../../../components/block';
import { ContainerType } from './types';
import mainhbs from './main.hbs';
import * as classes from '../../styles.module.scss';

 class Container extends Block<ContainerType> {
  public constructor() {
    super('div', { class: 'container', classes: classes });
  }

  public componentDidMount(): void {
    const anchors = this.getContent().querySelectorAll('a');
    anchors.forEach((a) => a.addEventListener('click', () => {
      location.assign(`http://${location.host}/${a.id.slice(0, 2) === 'id' ? a.id.match(/404|500/)[0] : a.id}`);
    }));
  }

  render() {
    return mainhbs();
  }
}

export { Container };
