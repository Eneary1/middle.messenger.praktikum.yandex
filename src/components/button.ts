import "../../.d"
import { Block } from './block';

interface IButton extends IBaseType {
  text: string;
}

class Button extends Block<IButton> {
  public constructor(text: string, name?: string) {
    super('button', { text, class: 'button', name });
  }

  public componentDidMount(): void {
    this.getContent().setAttribute('type', 'submit');
    if (this.props.name) this.getContent().setAttribute('name', this.props.name);
  }

  public render(): string {
    return this.props.text;
  }
}

export { Button };
