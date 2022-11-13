import '../../../../../.d';
import { Block } from '../../../../components/block';
import { DataForm } from '../form/form';
import { ContainerType } from './types';
import { ROUTES } from '../../../../utils/hash_enum';
import { routeFunc } from '../../../../utils/route_func';
import { submitCheck } from '../../../../utils/inputEvents';
import * as classes from '../../styles.module.scss';
import { router } from '../../../../utils/router';

function submit(e: SubmitEvent) {
  if (!submitCheck(e)) return;
  router.go(ROUTES.PROFILE);
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

  public componentDidMount(): void {
    console.log("A")
  }

  public render(): string {
    return this.props.elements.form.getContent().outerHTML;
  }
}

export { DataPage };
