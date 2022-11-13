import '../../../../../../../.d';
import { Block } from '../../../../../../components/block';
import top from './top.hbs';
import { GripContainer } from './gripContainer/gripContainer';

type TopType = {
  class: string,
  elements: {
    gripContainer: GripContainer
  }
};

class Top extends Block<TopType> {
  public constructor() {
    super('div', {
      class: 'message-tape__top',
      elements: {
        gripContainer: new GripContainer({
          click: () => {
            this.props.elements.gripContainer.props.elements.addUser.toggle();
          },
        }),
      },
    });
  }

  public componentDidMount(): void {
    const grip = this.props.elements.gripContainer;
  }

  public render(): string {
    return top({
      gripContainer: this.props.elements.gripContainer.getContent().outerHTML,
    });
  }
}

export { Top };
