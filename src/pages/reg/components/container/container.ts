import '../../../../../.d';
import { Block } from '../../../../components/block';
import { RegForm } from '../form/form';
import { ContainerType } from './types';
import { ROUTES } from '../../../../utils/hash_enum';
import { submitCheck } from '../../../../utils/inputEvents';
import * as classes from '../../styles.module.scss';
import { router } from '../../../../utils/router';

function submit(e: SubmitEvent) {
  if (!submitCheck(e)) return;
  router.go(ROUTES.MAIN);
}

class RegPage extends Block<ContainerType> {
  public constructor() {
    super('div', {
      classes: classes,
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
