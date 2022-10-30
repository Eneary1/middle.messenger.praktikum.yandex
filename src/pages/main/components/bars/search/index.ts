import '../../../../../../.d';
import { Block } from '../../../../../utils/block';
import search from './search.hbs';

class SearchBars extends Block {
  public constructor() {
    super('div', { class: 'chat-list__search-bar' });
  }

  public render(): string {
    return search();
  }
}

export { SearchBars };
