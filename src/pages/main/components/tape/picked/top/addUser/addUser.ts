import '../../../../../../../../.d';
import { Block } from '../../../../../../../components/block';

type TopType = {
  class: string
};

class AddUser extends Block<TopType> {
  public constructor() {
    super('div', { class: 'add-user' });
  }

  public componentDidMount(): void {
    this.hide();
  }

  public render(): string {
    return '';
  }
}

export { AddUser };
