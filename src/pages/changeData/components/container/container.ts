import '../../../../../.d';
import { Block } from '../../../../components/block';
import { DataForm } from '../form/form';
import { ContainerType } from './types';
import { ROUTES } from '../../../../utils/routeEnum';
import { submitCheck } from '../../../../utils/inputEvents';
import * as classes from '../../styles.module.scss';
import { router } from '../../../../utils/router';
import { NewFetch } from '../../../../utils/newFetch';

function submit(e: SubmitEvent) {
  if (!submitCheck(e)) return;
  const form = new FormData(e.target as HTMLFormElement)
  const newFetch = new NewFetch();
  newFetch.put("https://ya-praktikum.tech/api/v2/user/profile", {data: {
    first_name: form.get("first_name"),
    second_name: form.get("second_name"),
    display_name: form.get("display_name"),
    login: form.get("login"),
    phone: form.get("phone"),
    email: form.get("email") 
  },
  headers: {
    'Content-type': 'application/x-www-form-urlencoded'
  }}).then(() => {
    router.refresh(ROUTES.PROFILE)
  }).catch(()=>{console.log("Пользователь уже существует")})
}

class DataPage extends Block<ContainerType> {
  public constructor() {
    super('div', {
      classes: classes,
      class: 'container',
      elements: {
        form: new DataForm({ submit }),
      },
    });
  }

  public render(): string {
    return this.props.elements.form.getContent().outerHTML;
  }
}

export { DataPage };
