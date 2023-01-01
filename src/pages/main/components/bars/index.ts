import '../../../../../.d';
import Handlebars from 'handlebars';
import { Block } from '../../../../components/block';
import { ChatBars } from './chat_bars/index';
import { SearchBars } from './search/index';
import { NewFetch } from '../../../../utils/newFetch';
import { Bar } from './chat_bars/element/index';
import { baseURL, PATHS } from '../../../../utils/routeEnum';
import mainhbs from './main.hbs';

type BarsType = {
  class?: string,
  elements?: {
    search: SearchBars,
    bars: ChatBars,
  }
};

window.barsReload;

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
    const chatAdd = async (query?: string) => {
      new NewFetch().get(`${baseURL}${PATHS.CHATS}`).then((a) => {
        const usersElements = {};
        const res = JSON.parse(a.response);
        for (let i = 0; i < res.length; i++) {
          if (!!query && res[i].title.toLocaleLowerCase() !== query.toLocaleLowerCase()) continue;
          const name = `bar${i}`;
          const newBar = new Bar(res[i]);
          usersElements[name] = newBar;
        }
        this.props.elements.bars.setProps({
          elements: usersElements,
        });
      }).catch(() => { console.log('Чаты не удалось загрузить'); });
    };
    chatAdd();
    window.barsReload = chatAdd;
  }

  public render(): string {
    return Handlebars.compile(mainhbs)({
      search: this.props.elements.search.getContent().outerHTML,
      bars: this.props.elements.bars.getContent().outerHTML,
    });
  }
}

export { BarsContainer };
