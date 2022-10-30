import '../../../../../../../.d';
import { Block } from '../../../../../../utils/block';
import top from './top.hbs';

class Top extends Block {
  public constructor(moduleClass: Object) {
    super('div', { class: 'message-tape__top', moduleClass });
  }

  public componentDidMount(): void {
    this.modulateClasses(this.props.moduleClass);
    const self = this;
    this.getContent().querySelector(`.${this.props.moduleClass['grip-container']}`)!.addEventListener('click', function () {
      this.querySelector(`.${self.props.moduleClass['add-user']}`).classList.toggle('none');
    });
  }

  public render(): string {
    return top();
  }
}

export { Top };
