import '../../../../../.d';
import { Block } from '../../../../utils/block';
import { ChatBars } from './chat_bars/index';
import { SearchBars } from './search/index';
import { MessageTape } from '../tape/index';
import { users } from './chat_bars/index.tmpl';

class BarsContainer extends Block {
  /**
	 * @param moduleClass объект модульных классов
	 * @param messageTape лента сообщений выбранных баров
	 */
  public constructor(moduleClass: Object, messageTape: MessageTape) {
    super('aside', {
      class: 'chat-list',
      moduleClass,
      elements: {
        search: new SearchBars(),
        bars: new ChatBars({ users }),
        tape: messageTape,
      },
    });
  }

  private elem: null | HTMLElement = null;

  public componentDidMount(): void {
    this.modulateClasses(this.props.moduleClass);
    const elems = Array.from(this.getContent().getElementsByClassName(this.props.moduleClass['chat-list__list-element']));

    elems.forEach((a) => {
      const self = this;
      a.addEventListener('click', function () {
        if (this.classList.contains(self.props.moduleClass.checked)) {
          self.elem?.classList.remove(self.props.moduleClass.checked);
          self.elem = null;
          self.props.elements.tape.setProps({
            messages: undefined,
          });
          return;
        }
        self.elem?.classList.remove(self.props.moduleClass.checked);
        this.classList.add(self.props.moduleClass.checked);
        self.elem = this;
        self.props.elements.tape.setProps({
          messages: users[Number(this.dataset.id)].chatInfo,
        });
        self.props.elements.tape.getContent().querySelector(`.${self.props.elements.tape.props.moduleClass['attachment-container']}`)?.addEventListener('click', () => {
          self.props.elements.tape.getContent().querySelector(`.${self.props.moduleClass.attachment}`).classList.toggle('none');
        });
        self.props.elements.tape.getContent().querySelector(`.${self.props.elements.tape.props.moduleClass['grip-container']}`)?.addEventListener('click', () => {
          self.props.elements.tape.getContent().querySelector(`.${self.props.moduleClass['add-user']}`).classList.toggle('none');
        });
        const scrollable = self.props.elements.tape.getContent()?.querySelector(`.${self.props.moduleClass['message-tape__chat']}`);
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
