import "../../.d"
import { Block } from './block';

/**
 * Function for a fast main container block
 */

type InputProps<T = string> = {
	class?: T,
	id?: T,
	name?: T,
	type?: T
}

type InputType<T = string> = {
	class?: T,
	id?: T,
	events?: EventType,
	name?: T,
	type?: T
}

class Input extends Block<InputType> {
  public constructor(inputProps: InputProps, events?: EventType) {
    super('input', { 
		class: inputProps.class, 
		id: inputProps.id, 
		name: inputProps.name, 
		type: inputProps.type, 
		events });
  }

  public render(): string {
	if (this.props.type) this.getContent().setAttribute("type", this.props.type)
	return ""
  }
}

export { Input };