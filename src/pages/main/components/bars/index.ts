import '../../../../../.d';
import { Block } from '../../../../components/block';
import {ChatBars} from './chat_bars/index';
import { SearchBars } from './search/index';
import mainhbs from './main.hbs';
import { NewFetch } from '../../../../utils/newFetch';
import { Bar } from './chat_bars/element/index';
import { MessageTape } from '../tape/index';
import { ModalForm } from './search/modal/index';
import * as classes from "../../styles.module.scss"

type BarsType = {
  class?: string,
  elements?: {
    search: SearchBars,
    bars: ChatBars,
    tape: MessageTape,
    modal: ModalForm;
  }
};

class BarsContainer extends Block<BarsType> {

  public constructor() {
    super('aside', {
      class: 'chat-list',
      elements: {
        search: new SearchBars(),
        bars: new ChatBars(),
        tape: new MessageTape(),
        modal: new ModalForm()
      },
    });
  }

  public componentDidMount(): void {
    const chatAdd = async () => {
      new NewFetch().get("https://ya-praktikum.tech/api/v2/chats").then((a) => {
        const usersElements = {};
        const res = JSON.parse(a.response)
        for (let i = 0; i < res.length; i++) {
          const name = `bar${i}`;
          const newBar = new Bar(res[i]);
          usersElements[name] = newBar;
        }
        this.props.elements.bars.setProps({
          elements: usersElements
        })
      }).catch(()=>{})
    }
    chatAdd();
    this.props.elements.search.setProps({
      elements: {...this.props.elements.search.props.elements, modal: this.props.elements.modal}
    })
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
