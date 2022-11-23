import '../../../../../.d';
import { Block } from '../../../../components/block';
import { PassForm } from '../form/form';
import { ContainerType } from './types';
import { ROUTES } from '../../../../utils/routeEnum';
import { submitCheck } from '../../../../utils/inputEvents';
import mainhbs from './main.hbs';
import * as classes from '../../styles.module.scss';
import { router } from '../../../../utils/router';
import { NewFetch } from '../../../../utils/newFetch';

function submit(e: SubmitEvent) {
  if (!submitCheck(e)) return;
  const form = new FormData(e.target as HTMLFormElement)
  const newFetch = new NewFetch();
  newFetch.put("https://ya-praktikum.tech/api/v2/user/password", {data: {
    oldPassword: form.get("old_password"),
    newPassword: form.get("password"),
  },
  headers: {
    'Content-type': 'application/x-www-form-urlencoded'
  }}).then(() => {
    router.refresh(ROUTES.PROFILE)
  }).catch(()=>{console.log("Неверный старый пароль")})
}

class PassPage extends Block<ContainerType> {
  public constructor() {
    super('div', {
      classes: classes,
      class: 'container',
      elements: {
        form: new PassForm({ submit }),
      },
    });
  }

  public render(): string {
    return mainhbs({
      form: this.props.elements.form.getContent().outerHTML,
    });
  }
}

export { PassPage };
