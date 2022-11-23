import '../../../../../../../.d';
import { Block } from '../../../../../../components/block';
import bottom from './bottom.hbs';
import { MessageForm } from './form/form';
import { submitCheck } from '../../../../../../utils/inputEvents';
import { NewFetch } from '../../../../../../utils/newFetch';
import { router } from '../../../../../../utils/router';
import * as classes from  "../../../../styles.module.scss"

let message: string;

const chatUpd = async (event: MessageEvent, socket) => {
  let res = JSON.parse(event.data);
  if (!(res instanceof Array)) {
    socket.send(JSON.stringify({
      content: "0",
      type: 'get old'
    }))
    return
  } 
  let messages: Array<any>;
  let userID: string;
  await new NewFetch().get("https://ya-praktikum.tech/api/v2/auth/user").then((a) => {userID = JSON.parse(a.response).id})
  messages = res.reduceRight((a, b) => {
    a.push({})
    const c = a[a.length - 1]
    if (b.user_id === userID) {
      c.class = "message-tape__reciever"
      c.content = b.content
    }
    else {
      c.class = "message-tape__sender"
      c.content = b.content
    }
    return a
  }, []);
  window.chat.forEach((a) => {
    if (document.contains(a.getContent()))
    a.setProps({
      messages: {
        messages: messages
      }
    })
  })
}

const submitFunc = (socket) => { 
  return async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    if ((formData.get("message") as string).trim() === "") return;
    message = formData.get("message") as string
    socket.send(JSON.stringify({
      content: message,
      type: 'message',
    }));
  }
}

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
      classes: classes,
      socket: null,
      elements: {
        messageForm: new MessageForm(),
      },
    });
  }

  public componentDidMount(): void {
    if (!router.selectedChat()) return
    (async () => {
      let userID;
      await new NewFetch().get("https://ya-praktikum.tech/api/v2/auth/user").then((a) => {userID = JSON.parse(a.response).id})
      await new NewFetch().post(`https://ya-praktikum.tech/api/v2/chats/token/${router.selectedChat()}`)
        .then((a) => {
          this.props.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userID}/${router.selectedChat()}/${JSON.parse(a.response).token}`);
        })

        this.props.socket.addEventListener('open', () => {
          console.log('Соединение установлено');
          this.props.socket.send(JSON.stringify({
            content: '0',
            type: 'get old',
          }));
        });
        
        this.props.socket.addEventListener('close', event => {
          if (event.wasClean) {
            console.log('Соединение закрыто чисто');
          } else {
            console.log('Обрыв соединения');
          }
        
          console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        });
        
        this.props.socket.addEventListener('message', async (event: MessageEvent) => {
          window.barsReload.forEach((a) => {
            a()
          })
          await chatUpd(event, this.props.socket)
        });
        
        this.props.socket.addEventListener('error', (event: ErrorEvent) => {
          console.log('Ошибка', event.message);
        });
    
        this.props.elements.messageForm.setProps(({
          events: {
            submit: submitFunc(this.props.socket)
          }
        }))

        setInterval(() => {
          this.props.socket.send(JSON.stringify({
            type: 'ping'
          }));
        }, 5000)
    })()
  }

  public render(): string {
    return bottom({
      messageForm: this.props.elements.messageForm.getContent().outerHTML,
    });
  }
}

export { Bottom };
