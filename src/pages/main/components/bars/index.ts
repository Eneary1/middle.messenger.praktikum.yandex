import '../../../../../.d';
import { Block } from '../../../../components/block';
import { ChatBars } from './chat_bars/index';
import { SearchBars } from './search/index';
import { MessageTape, TapeType } from '../tape/index';
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
  /**
	 * @param messageTape лента сообщений выбранных баров
	 */
  public constructor(messageTape: MessageTape) {
    super('aside', {
      class: 'chat-list',
      elements: {
        search: new SearchBars(),
        bars: new ChatBars({ users }),
        tape: messageTape,
      },
    });
  }

  private pickedBar: null | HTMLElement = null;

  public componentDidMount(): void {
    this.modulateClasses(classes);
    const elems = Array.from(this.getContent().getElementsByClassName(classes['chat-list__list-element']));

    // В связи с тем, что информация, приходимая с сервера, является загадкой, было решено сделать этот компонент
    // слегка некрасивым образом и напрямую использовать addEventListener. В будущем этот компонент будет пересмотрен

    elems.forEach((a) => {
      const self = this;
      a.addEventListener('click', function () {
        if (this.classList.contains(classes.checked)) {
          self.pickedBar?.classList.remove(classes.checked);
          self.pickedBar = null;
          self.props.elements.tape.setProps({
            messages: undefined,
          } as TapeType);
          return;
        }
        self.pickedBar?.classList.remove(classes.checked);
        this.classList.add(classes.checked);
        self.pickedBar = this;

        const { chat } = self.props.elements.tape.props.elements.picked.props.elements;
        chat.props.messages = users[Number(this.dataset.id)].chatInfo;

        const { picked } = self.props.elements.tape.props.elements;
        picked.props.messages = users[Number(this.dataset.id)].chatInfo;

        self.props.elements.tape.props.messages = users[Number(this.dataset.id)].chatInfo;

        const scrollable = self.props.elements.tape.getContent()?.querySelector(`.${classes['message-tape__chat']}`);
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
