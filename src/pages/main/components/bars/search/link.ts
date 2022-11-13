import '../../../../../../.d';
import { Block } from '../../../../../components/block';

type SearchType = {
  class: string,
  events: EventType
};

class Link extends Block<SearchType> {
  public constructor(events: EventType) {
    super('p', { class: 'profile', events});
  }

  public render(): string {
    return "Профиль";
  }
}

export { Link };
