import '../../../../../.d';
import { Block } from '../../../../components/block';
import { AuthorForm } from '../form/form';
import { ContainerType } from './types';
import { baseURL, PATHS, ROUTES, xhrContentType } from '../../../../utils/routeEnum';
import { submitCheck } from '../../../../utils/inputEvents';
import * as classes from '../../styles.module.scss';
import { router } from '../../../../utils/router';
import { NewFetch } from '../../../../utils/newFetch';
import { objectFromFormData } from '../../../../utils/formDataConvert';

function submit(e: SubmitEvent) {
  if (!submitCheck(e)) return;
  const newFetch = new NewFetch();
  newFetch.post(`${baseURL}${PATHS.SIGNIN}`, {
    data: objectFromFormData(new FormData(e.target as HTMLFormElement)),
    headers: xhrContentType
  }).then(() => {
    location.reload()
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
