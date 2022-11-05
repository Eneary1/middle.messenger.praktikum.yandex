import { Block } from '../../../../../components/block';
import * as classes from '../../../styles.module.scss';

type BarPickedChat = {
  class: string
}

class BarUnpicked extends Block<BarPickedChat> {
  public constructor() {
    super('div', { class: 'message-tape_unpicked'});
  }

  public componentDidMount(): void {
    this.modulateClasses(classes);
  }

  public render(): string {
    return '<p>Выберите чат</p>';
  }
}

export { BarUnpicked };
