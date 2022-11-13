import '../../../../../../../../.d';
import { Block } from '../../../../../../../components/block';

type TopType = {
  class: string
};

class Attachment extends Block<TopType> {
  public constructor() {
    super('div', { class: 'attachment' });
  }

  public componentDidMount(): void {
    this.hide();
  }

  public render(): string {
    return '';
  }
}

export { Attachment };
