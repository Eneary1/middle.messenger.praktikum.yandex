import '../../../.d';
import { Block } from '../block';

class NameHint extends Block<{ class: string, events?: EventType }> {
  public constructor() {
    super('div', { class: 'hint' });
  }

  public componentDidMount(): void {
    this.hide();
  }

  public render(): string {
    return 'Должно начинаться с заглавной буквы, не содержать пробелов и не иметь спецсимволов, кроме "-"';
  }
}

export { NameHint };
