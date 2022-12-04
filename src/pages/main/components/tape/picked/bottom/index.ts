import '../../../../../../../.d';
import { Block } from '../../../../../../components/block';
import bottom from './bottom.hbs';
import { MessageForm } from './form/form';
import { NewFetch } from '../../../../../../utils/newFetch';
import { router } from '../../../../../../utils/router';
import classes from '../../../../styles.module.scss';
import { baseURL, PATHS } from '../../../../../../utils/routeEnum';

let message: string;

const submitFunc = () => async (e: SubmitEvent) => {
  e.preventDefault();
  const target: HTMLFormElement = e.target as HTMLFormElement;
  const formData = new FormData(target);
  if ((formData.get('message') as string).trim() === '') return;
  message = formData.get('message') as string;
  window.socket.socket.send(JSON.stringify({
    content: message,
    type: 'message',
  }));
  const input: HTMLInputElement = target.querySelector('input');
  input.value = '';
};

type BottomType = {
  class: string,
  socket: WebSocket | null,
  classes: object,
  elements: {
    messageForm: MessageForm
  }
};

class Bottom extends Block<BottomType> {
  public constructor() {
    super('div', {
      class: 'message-tape__bottom',
      classes,
      socket: null,
      elements: {
        messageForm: new MessageForm(),
      },
    });
  }

  public componentDidMount(): void {
    if (!router.selectedChat()) return;
    this.props.elements.messageForm.setProps(({
      events: {
        submit: submitFunc(),
      },
    }));
    window.bottom.push(this);
    if (!window.socket.socket) return;
    window.socket.socket.onmessage = async (event: MessageEvent) => {
      window.bottom.forEach((a) => {
        if (document.contains(a.getContent())) {
          a.chatUpd(event);
        }
      });
    };
    window.socket.socket.send(JSON.stringify({
      content: '0',
      type: 'get old',
    }));
  }

  public chatUpd = async (event: MessageEvent) => {
    let res = JSON.parse(event.data);
    if (res.type === 'pong') return;
    if (!(res instanceof Array)) {
      window.socket.socket.send(JSON.stringify({
        content: '0',
        type: 'get old',
      }));
      return;
    }
    window.barsReload.forEach((a) => {
      a();
    });
    let messages: Array<any>;
    let userID: string;
    await new NewFetch().get(`${baseURL}${PATHS.USER}`).then((a) => { userID = JSON.parse(a.response).id; }).catch((a) => { console.log('Профиль не удалось загрузить'); });
    messages = res.reduceRight((a, b) => {
      a.push({});
      const c = a[a.length - 1];
      if (b.user_id === userID) {
        c.class = 'message-tape__reciever';
        c.content = b.content;
      } else {
        c.class = 'message-tape__sender';
        c.content = b.content;
      }
      return a;
    }, []);
    window.chat.forEach((a) => {
      if (document.contains(a.getContent())) {
        a.setProps({
          messages: {
            messages,
          },
        });
      }
    });
  };

  public render(): string {
    return bottom({
      messageForm: this.props.elements.messageForm.getContent().outerHTML,
    });
  }
}

export { Bottom };
