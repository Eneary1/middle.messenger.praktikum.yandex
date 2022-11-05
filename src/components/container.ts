import "../../.d"
import { Block } from './block';

/**
 * Function for a fast main container block
 */
type ContainerType = {class: string, insides: string}
class Container extends Block<ContainerType> {
  public constructor(insides) {
    super('div', { class: 'container', insides});
  }

  render() {
    return this.props.insides;
  }
}

export { Container };
