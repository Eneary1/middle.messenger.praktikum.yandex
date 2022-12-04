import '../../../../../.d';
import { Block } from '../../../../components/block';
import { DataForm } from '../form/form';
import { ContainerType } from './types';
import {
  baseURL, PATHS, ROUTES, xhrContentType,
} from '../../../../utils/routeEnum';
import { submitCheck } from '../../../../utils/inputEvents';
import classes from '../../styles.module.scss';
import { router } from '../../../../utils/router';
import { NewFetch } from '../../../../utils/newFetch';
import { objectFromFormData } from '../../../../utils/formDataConvert';

const submit = (e: SubmitEvent) => {
  e.preventDefault();
  if (!submitCheck(e)) return;
  const form = new FormData(e.target as HTMLFormElement);
  const newFetch = new NewFetch();
  newFetch.put(`${baseURL}${PATHS.PROFILE}`, {
    data: objectFromFormData(form),
    headers: xhrContentType,
  }).then(async () => {
    let userData;
    const prof = router.getRoute(ROUTES.PROFILE);
    await newFetch.get(`${baseURL}${PATHS.USER}`)
      .then((a) => {
        userData = JSON.parse(a.response);
      })
      .catch(() => {});
    if (prof.block) {
      prof.block.setProps({
        userData,
      });
    }
    router.go(ROUTES.PROFILE);
  }).catch(() => { console.log('Что-то пошло не так'); });
};

class DataPage extends Block<ContainerType> {
  public constructor() {
    super('div', {
      classes,
      class: 'container',
      elements: {
        form: new DataForm({ submit }),
      },
    });
  }

  public componentDidMount(): void {
    const form = this.props.elements.form.getContent();
    const inputs = Array.from(form.querySelectorAll('input'));
    (async () => {
      let obj;
      await new NewFetch().get(`${baseURL}${PATHS.USER}`).then((a) => {
        obj = JSON.parse(a.response);
      });
      inputs.forEach((input) => {
        for (let a of Object.keys(obj)) {
          if (input.name === a) {
            input.value = obj[a];
          }
        }
      });
    })();
  }

  public render(): string {
    return this.props.elements.form.getContent().outerHTML;
  }
}

export { DataPage };
