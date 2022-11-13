import '../../../../../.d';
import { Block } from '../../../../components/block';
import { PassForm } from '../form/form';
import { ContainerType } from './types';
import { ROUTES } from '../../../../utils/hash_enum';
import { routeFunc } from '../../../../utils/route_func';
import { submitCheck } from '../../../../utils/inputEvents';
import mainhbs from './main.hbs';
import * as classes from '../../styles.module.scss';
import { router } from '../../../../utils/router';

function submit(e: SubmitEvent) {
  if (!submitCheck(e)) return;
  router.go(ROUTES.PROFILE);
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
