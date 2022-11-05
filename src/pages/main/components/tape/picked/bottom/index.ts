import '../../../../../../../.d';
import { Block } from '../../../../../../components/block';
import bottom from './bottom.hbs';
import * as classes from '../../../../styles.module.scss';

type BottomType = {
  class: string
}

class Bottom extends Block<BottomType> {
  public constructor() {
    super('div', { class: 'message-tape__bottom' });
  }

  public componentDidMount(): void {
    this.modulateClasses(classes);
  }

  public render(): string {
    return bottom();
  }
}

export { Bottom };
