import '../../../.d';
import { Block } from '../block';

class PhoneHint extends Block<{ class: string, events?: EventType }> {
  public constructor() {
    super('div', { class: 'hint' });
  }

  public componentDidMount(): void {
    this.hide();
  }

  public render(): string {
    return 'От 10 до 15 симолов без пробелов, может быть + в начале';
  }
}

export { PhoneHint };
