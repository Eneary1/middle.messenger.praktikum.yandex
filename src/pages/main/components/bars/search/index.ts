import '../../../../../../.d';
import { Block } from '../../../../../components/block';
import search from './search.hbs';

type SearchType = {
  class: string
}

class SearchBars extends Block<SearchType> {
  public constructor() {
    super('div', { class: 'chat-list__search-bar' });
  }

  public render(): string {
    return search();
  }
}

export { SearchBars };
