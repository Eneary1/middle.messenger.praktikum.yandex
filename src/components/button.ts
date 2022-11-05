import "../../.d"
import { Block } from './block';

type ButtonType = {
  text?: string,
  type?: string,
  class?: string,
  name?: string
}

type ButtonProps = {
  text?: string,
  type?: string,
  class?: string,
  name?: string
}

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
