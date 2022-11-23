import '../../../../../.d';
import { Block } from '../../../../components/block';
import { AuthorForm } from '../form/form';
import { ContainerType } from './types';
import { ROUTES } from '../../../../utils/routeEnum';
import { submitCheck } from '../../../../utils/inputEvents';
import * as classes from '../../styles.module.scss';
import { router } from '../../../../utils/router';
import { NewFetch } from '../../../../utils/newFetch';

function submit(e: SubmitEvent) {
  if (!submitCheck(e)) return;
  const newFetch = new NewFetch();
  newFetch.post("https://ya-praktikum.tech/api/v2/auth/signin", {data: {
    password: (new FormData(e.target as HTMLFormElement)).get("password"),
    login: (new FormData(e.target as HTMLFormElement)).get("login")
  },
  headers: {
    'Content-type': 'application/x-www-form-urlencoded'
  }}).then(() => {
    router.refresh(ROUTES.MAIN)
  }).catch(()=>{console.log("Пользователя не существует или он уже вошёл")})
}

class AuthorPage extends Block<ContainerType> {
  public constructor() {
    super('div', {
      classes: classes,
      class: 'container',
      elements: {
        form: new AuthorForm({ submit }),
      },
    });
  }

  public render(): string {
    return this.props.elements.form.getContent().outerHTML;
  }
}

export { AuthorPage };
