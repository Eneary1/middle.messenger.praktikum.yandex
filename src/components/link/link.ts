import '../../../.d';
import { Block } from '../block';
import { LinkType, LinkProps } from './types';

class Link extends Block<LinkType> {
  public constructor(linkProps: LinkProps, events?: EventType) {
	  super('a', {
		  class: linkProps.class,
		  id: linkProps.id,
		  text: linkProps.text,
		  events,
    });
  }

  public render(): string {
	  if (this.props.href) this.getContent().setAttribute('type', this.props.href);
	  return this.props.text ? this.props.text : '';
  }
}

export { Link };
