import '../../../../../.d';
import { Block } from '../../../../components/block';
import { RegForm } from '../form/form';
import { ContainerType } from './types';
import {
  baseURL, PATHS, ROUTES, xhrContentType,
} from '../../../../utils/routeEnum';
import { submitCheck } from '../../../../utils/inputEvents';
import * as classes from '../../styles.module.scss';
import { router } from '../../../../utils/router';
import { NewFetch } from '../../../../utils/newFetch';
import { objectFromFormData } from '../../../../utils/formDataConvert';

function submit(e: SubmitEvent) {
  if (!submitCheck(e)) return;
  const form = new FormData(e.target as HTMLFormElement);
  const newFetch = new NewFetch();
  newFetch.post(`${baseURL}${PATHS.SIGNUP}`, {
    data: objectFromFormData(form),
    headers: xhrContentType,
  }).then(() => {
    router.go(ROUTES.ENTER);
    location.reload();
  }).catch(() => {});
}

class RegPage extends Block<ContainerType> {
  public constructor() {
    super('div', {
      classes,
      class: 'container',
      elements: {
        form: new RegForm({ submit }),
      },
    });
  }

  public render(): string {
    return this.props.elements.form.getContent().outerHTML;
  }
}

export { RegPage };
