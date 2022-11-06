import '../../../.d';
import { Block } from '../block';
import { ButtonProps, ButtonType } from './types';

class Button extends Block<ButtonType> {
  public constructor(buttonProps: ButtonProps) {
    super('button', { ...buttonProps });
  }

  public componentDidMount(): void {
    if (this.props.type) this.getContent().setAttribute('type', this.props.type);
    if (this.props.name) this.getContent().setAttribute('name', this.props.name);
  }

  public render(): string {
    return this.props.text;
  }
}

export { Button };
