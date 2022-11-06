import '../../../.d';
import { Block } from '../block';

class PassHint extends Block<{ class: string, events?: EventType }> {
  public constructor() {
    super('div', { class: 'hint' });
  }

  public componentDidMount(): void {
    this.hide();
  }

  public render(): string {
    return 'Пароль должен содержать от 8 до сорока симоволов, одну заглавную букву и цифру';
  }
}

export { PassHint };
