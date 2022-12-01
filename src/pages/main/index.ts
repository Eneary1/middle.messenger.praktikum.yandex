import '../../../.d';
import { BarsContainer } from './components/bars/index';
import { MessageTape } from './components/tape/index';
import { Block } from '../../components/block';
import mainhbs from './main.hbs';
import classes from './styles.module.scss';

type ContainerType = { class?: string, classes?: object, elements: {
  bars: BarsContainer,
  tape: MessageTape
} };

class MainPage extends Block<ContainerType> {
  public constructor() {
    super('div', {
      class: 'container',
      classes,
      elements: {
        bars: new BarsContainer(),
        tape: new MessageTape(),
      },
    });
  }

  render() {
    return mainhbs({
      tape: this.props.elements.tape.getContent().outerHTML,
      bars: this.props.elements.bars.getContent().outerHTML,
    });
  }
}

export { MainPage };
