import "../../.d"
import { Block } from './block';

type LinkProps<T = string> = {
	id?: T,
	href?: T,
	class?: T,
	text?: T
}

type LinkType<T = string> = {
	class?: T,
	id?: T,
	events?: EventType,
	href?: T,
	text?: T
}

class Link extends Block<LinkType> {
	public constructor(linkProps: LinkProps, events?: EventType) {
	  super('a', { 
		  class: linkProps.class, 
		  id: linkProps.id,
		  text: linkProps.text,
		  events });
	}
  
	public render(): string {
	  if (this.props.href) this.getContent().setAttribute("type", this.props.href)
	  return this.props.text
	}
  }

export {Link}