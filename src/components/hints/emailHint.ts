import '../../../.d';
import { Block } from '../block';

class EmailHint extends Block<{ class: string, events?: EventType }> {
  public constructor() {
    super('div', { class: 'hint' });
  }

  public componentDidMount(): void {
    this.hide();
  }

  public render(): string {
    return 'Должен быть типа email5@mail.com: обязательно иметь @ и слово до неё, точку после неё и слово перед и после точки';
  }
}

export { EmailHint };
