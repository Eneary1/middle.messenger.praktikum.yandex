import '../../../../../.d';
import { Block } from '../../../../components/block';
import { ChatBars } from './chat_bars/index';
import { SearchBars } from './search/index';
import mainhbs from './main.hbs';
import { NewFetch } from '../../../../utils/newFetch';
import { Bar } from './chat_bars/element/index';
import { baseURL, PATHS } from '../../../../utils/routeEnum';

type BarsType = {
  class?: string,
  elements?: {
    search: SearchBars,
    bars: ChatBars,
  }
};

class BarsContainer extends Block<BarsType> {
  public constructor() {
    super('aside', {
      class: 'chat-list',
      elements: {
        search: new SearchBars(),
        bars: new ChatBars(),
      },
    });
  }

  public componentDidMount(): void {
    const chatAdd = async () => {
      new NewFetch().get(`${baseURL}${PATHS.CHATS}`).then((a) => {
        const usersElements = {};
        const res = JSON.parse(a.response);
        for (let i = 0; i < res.length; i++) {
          const name = `bar${i}`;
          const newBar = new Bar(res[i]);
          usersElements[name] = newBar;
        }
        this.props.elements.bars.setProps({
          elements: usersElements,
        });
      }).catch(() => {});
    };
    chatAdd();
    window.barsReload.push(chatAdd);
  }

  public render(): string {
    return mainhbs({
      search: this.props.elements.search.getContent().outerHTML,
      bars: this.props.elements.bars.getContent().outerHTML,
    });
  }
}

export { BarsContainer };
