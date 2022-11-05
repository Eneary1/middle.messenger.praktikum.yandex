import '../../../../../../../.d';
import { Block } from '../../../../../../components/block';
import top from './top.hbs';
import * as classes from '../../../../styles.module.scss';

type TopType = {
  class: string
}

class Top extends Block<TopType> {
  public constructor() {
    super('div', { class: 'message-tape__top'});
  }

  public componentDidMount(): void {
    this.modulateClasses(classes);
    const self = this;
    this.getContent().querySelector(`.${classes['grip-container']}`)!.addEventListener('click', function () {
      this.querySelector(`.${classes['add-user']}`).classList.toggle('none');
    });
  }

  public render(): string {
    return top();
  }
}

export { Top };
