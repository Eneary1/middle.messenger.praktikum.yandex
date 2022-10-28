import {Block} from "./block";

/**
 * Function for a fast main container block
 */

 class Container extends Block {
	public constructor(template: string) {
		super("div", {class: "container", template: template});
	}

	render() {
		return this.props.template;
	}
}

export {Container}
