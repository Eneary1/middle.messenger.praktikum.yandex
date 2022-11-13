import '../../../../../.d';
import { Block } from '../../../../components/block';
import { ChatBars } from './chat_bars/index';
import { SearchBars } from './search/index';
import { MessageTape } from '../tape/index';
import { users } from './chat_bars/index.tmpl';
import mainhbs from './main.hbs';
import * as classes from '../../styles.module.scss';

type BarsType = {
  class?: string,
  elements?: {
    search: SearchBars,
    bars: ChatBars
    tape: MessageTape,
  }
};

class BarsContainer extends Block<BarsType> {

  public constructor() {
    super('aside', {
      class: 'chat-list',
      elements: {
        search: new SearchBars(),
        bars: new ChatBars({ users }),
        tape: new MessageTape(),
      },
    });
  }

  private pickedBar: null | HTMLElement = null;

  public componentDidMount(): void {
    this.modulateClasses(classes);
    const elems = Array.from(this.getContent().getElementsByClassName(classes['chat-list__list-element']));

    elems.forEach((a) => {
      const self = this;
      a.addEventListener('click', function () {
        if (this.classList.contains(classes.checked)) {
          self.pickedBar?.classList.remove(classes.checked);
          self.pickedBar = null;
          self.props.elements.tape.props.messages = undefined
          return;
        }
        self.pickedBar?.classList.remove(classes.checked);
        this.classList.add(classes.checked);
        self.pickedBar = this;

        const chatInfo = users[Number(this.dataset.id)].chatInfo

        const { chat } = self.props.elements.tape.props.elements.picked.props.elements;
        chat.setProps({messages: chatInfo})

        const { tape } = self.props.elements;
        tape.setProps({messages: chatInfo})

        const scrollable = chat.getContent();
        scrollable?.scrollBy(0, scrollable!.scrollHeight);
      });
    });
  }

  public render(): string {
    return mainhbs({
      search: this.props.elements.search.getContent().outerHTML,
      bars: this.props.elements.bars.getContent().outerHTML,
    });
  }
}

export { BarsContainer };
