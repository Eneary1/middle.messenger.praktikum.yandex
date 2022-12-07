import '../../../../../.d';
import { Block } from '../../../../components/block';
import { PassForm } from '../form/form';
import { ContainerType } from './types';
import {
  baseURL, PATHS, ROUTES, xhrContentType,
} from '../../../../utils/routeEnum';
import { submitCheck } from '../../../../utils/inputEvents';
import mainhbs from './main.hbs';
import classes from '../../styles.module.scss';
import { router } from '../../../../utils/router';
import { NewFetch } from '../../../../utils/newFetch';
import { Avatar } from '../../../../components/avatar/avatar';
import handlebars from 'handlebars';

function submit(e: SubmitEvent) {
  if (!submitCheck(e)) return;
  const form = new FormData(e.target as HTMLFormElement);
  const newFetch = new NewFetch();
  newFetch.put(`${baseURL}${PATHS.PASSWORD}`, {
    data: {
      oldPassword: form.get('old_password'),
      newPassword: form.get('password'),
    },
    headers: xhrContentType,
  }).then(() => {
    router.go(ROUTES.PROFILE);
  }).catch(() => { console.log('Неверный старый пароль'); });
}
let avatar;
(async () => {
  await new NewFetch().get(`${baseURL}${PATHS.USER}`)
    .then((a) => { avatar = JSON.parse(a.response).avatar; })
    .catch(() => {});
})();

class PassPage extends Block<ContainerType> {
  public constructor() {
    super('div', {
      classes,
      class: 'container',
      elements: {
        form: new PassForm({ submit }),
        avatar: new Avatar({
          src: avatar,
          class: 'icon avatar',
        }),
      },
    });
  }

  public render(): string {
    this.props.elements.avatar.setProps({
      src: window.avatar,
    });
    return handlebars.compile(mainhbs)({
      form: this.props.elements.form.getContent().outerHTML,
      avatar: this.props.elements.avatar.getContent().outerHTML,
    });
  }
}

export { PassPage };
