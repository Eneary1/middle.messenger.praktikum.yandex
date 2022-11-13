import '../../../../../../.d';
import { Block } from '../../../../../components/block';
import { HASHES } from '../../../../../utils/hash_enum';
import { routeFunc } from '../../../../../utils/route_func';
import { Link } from './link';
import search from './search.hbs';

type SearchType = {
  class: string
  elements: {
    link: Link
  }
};

class SearchBars extends Block<SearchType> {
  public constructor() {
    super('div', { class: 'chat-list__search-bar', elements: {
      link: new Link({
        click: () => {routeFunc(HASHES.PROFILE)}
      })
    }});
  }

  public render(): string {
    return search({
      link: this.props.elements.link.getContent().outerHTML
    });
  }
}

export { SearchBars };
