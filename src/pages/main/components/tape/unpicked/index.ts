import { Block } from '../../../../../components/block';

type BarPickedChat = {
  class: string
};

class BarUnpicked extends Block<BarPickedChat> {
  public constructor() {
    super('div', { class: 'message-tape_unpicked' });
  }

  public render(): string {
    return '<p>Выберите чат</p>';
  }
}

export { BarUnpicked };
