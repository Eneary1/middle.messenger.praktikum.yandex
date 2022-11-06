import '../../../.d';
import { Block } from '../block';

class LoginHint extends Block<{ class: string, events?: EventType }> {
  public constructor() {
    super('div', { class: 'hint' });
  }

  public componentDidMount(): void {
    this.hide();
  }

  public render(): string {
    return 'Логин должен содержать от 3 до 20 символов, без пробелов и спецсимолов, не может состоять полностью из цифр. Латиница';
  }
}

export { LoginHint };
