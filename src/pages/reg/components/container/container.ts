import '../../../../../.d';
import { Block } from '../../../../components/block';
import { RegForm } from '../form/form';
import { ContainerType } from './types';
import { HASHES } from '../../../../utils/hash_enum';
import { routeFunc } from '../../../../utils/route_func';
import { submitCheck } from '../../../../utils/inputEvents';

/**
 * Function for a fast main container block
 */

function submit(e: SubmitEvent) {
  if (!submitCheck(e)) return;
  routeFunc(HASHES.MAIN);
}

class Container extends Block<ContainerType> {
  public constructor() {
    super('div', {
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

export { Container };
