import '../../../.d';
import { Block } from '../block';

class PassRepeatHint extends Block<{ class: string, events?: EventType }> {
  public constructor() {
    super('div', { class: 'hint' });
  }

  public componentDidMount(): void {
    this.hide();
  }

  public render(): string {
    return 'Пароли должны повторяться';
  }
}

export { PassRepeatHint };
