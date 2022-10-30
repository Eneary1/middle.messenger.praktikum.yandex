import { Block } from './block';

class Button extends Block {
  public constructor(text: string, name?: string) {
    super('button', {text, class: "button", name});
  }

  public componentDidMount(): void {
	this.getContent().setAttribute("type", "submit")
	if (this.props.name) this.getContent().setAttribute("name", this.props.name)
  }

  public render(): string {
	return this.props.text;
  }
}

export { Button };
