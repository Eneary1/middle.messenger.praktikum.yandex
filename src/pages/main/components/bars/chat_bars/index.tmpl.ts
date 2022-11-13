import '../../../../../../.d';
import chatElement from './chat-bar.hbs';

// fake api
const messages: ChatType = []

for (let i = 0; i < 35; ++i) {
  messages.push(
    {
      class: 'message-tape__sender',
      content: 'URA!URA!URA!URA!URA!URA!URA!URA!URA!URA!URA!URA!URA!URA!URA!URA!URA!URA!URA!URA!URA!URA!URA!URA!URA!URA!URA!URA!URA!URA!URA!',
    },
    {
      class: 'message-tape__reciever',
      content: 'ura?ura?ura?ura?ura?ura?ura?ura?ura?ura?ura?ura?ura?ura?ura?ura?ura?ura?ura?ura?ura?ura?ura?ura?ura?ura?ura?ura?ura?ura?ura?',
    },
  );
}

const users: Array<{
  barInfo: {
    name: string,
    text: string,
    date: string,
    incoming: number
  },
  chatInfo: {
    messages: ChatType
  },
  id: number
}> = [];

for (let i = 0; i < 30; i++) {
  users.push(
    {
      barInfo: {
        name: 'ivan',
        text: messages[messages.length - 1].content,
        date: Date().match(/..:../)![0],
        incoming: Math.round(Math.random() * 10),
      },
      chatInfo: {
        messages
      },
      id: i,
    },
  );
}

const chatBars = chatElement({ users });

export { chatBars, users };
