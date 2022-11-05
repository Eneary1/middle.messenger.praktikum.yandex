import '../../../../../.d';
import { Block } from '../../../../components/block';
import { ChatBars } from './chat_bars/index';
import { SearchBars } from './search/index';
import { MessageTape, TapeType } from '../tape/index';
import { users } from './chat_bars/index.tmpl';
import * as classes from '../../styles.module.scss';

type BarsType = {
  class?: string,
  elements?: {
    search: SearchBars,
      bars: ChatBars
      tape: MessageTape,
  }
}

class BarsContainer extends Block<BarsType> {
  /**
	 * @param moduleClass объект модульных классов
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
        self.props.elements.tape.setProps({
          messages: users[Number(this.dataset.id)].chatInfo,
        } as TapeType);
        self.props.elements.tape.getContent().querySelector(`.${classes['attachment-container']}`)?.addEventListener('click', () => {
          self.props.elements.tape.getContent().querySelector(`.${classes.attachment}`).classList.toggle('none');
        });
        self.props.elements.tape.getContent().querySelector(`.${classes['grip-container']}`)?.addEventListener('click', () => {
          self.props.elements.tape.getContent().querySelector(`.${classes['add-user']}`).classList.toggle('none');
        });
        const scrollable = self.props.elements.tape.getContent()?.querySelector(`.${classes['message-tape__chat']}`);
        scrollable?.scrollBy(0, scrollable!.scrollHeight);
      });
    });
  }

  public render(): string {
    return `
		${this.props.elements.search.getContent().outerHTML}
		${this.props.elements.bars.getContent().outerHTML}
		`;
  }
}

export { BarsContainer };
