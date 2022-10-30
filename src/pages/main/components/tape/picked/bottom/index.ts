import '../../../../../../../.d';
import { Block } from '../../../../../../utils/block';
import bottom from './bottom.hbs';

class Bottom extends Block {
  public constructor(moduleClass) {
    super('div', { class: 'message-tape__bottom', moduleClass });
  }

  public componentDidMount(): void {
    this.modulateClasses(this.props.moduleClass);
  }

  public render(): string {
    return bottom();
  }
}

export { Bottom };
