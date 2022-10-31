import { Block } from '../../../../../utils/block';

class BarUnpicked extends Block {
  public constructor(moduleClass: Object) {
    super('div', { class: 'message-tape_unpicked', moduleClass });
  }

  public componentDidMount(): void {
    this.modulateClasses(this.props.moduleClass);
  }

  public render(): string {
    return '<p>Выберите чат</p>';
  }
}

export { BarUnpicked };
