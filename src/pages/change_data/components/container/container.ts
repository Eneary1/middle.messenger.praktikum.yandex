import '../../../../../.d';
import { Block } from '../../../../components/block';
import { RegForm } from "../form/form"
import { ContainerType } from "./types"
import { HASHES } from '../../../../utils/hash_enum';
import { routeFunc } from '../../../../utils/route_func';
import { showInputs } from '../../../../utils/show_inputs';
import * as classes from '../../styles.module.scss';

/**
 * Function for a fast main container block
 */

function submit(e: SubmitEvent) {
  e.preventDefault();
  const form = e.target as HTMLFormElement
  const inputs = Array.from(form.querySelectorAll("input"))
  for (let i of inputs) {
    if (i.classList.contains(classes.invalid)) return;
    if (i.value === '') {
      i.classList.add(classes.invalid);
      return;
    }
  }
  showInputs(form);
  routeFunc(HASHES.PROFILE);
}

class Container extends Block<ContainerType> {
  public constructor() {
    super('div', { class: 'container', elements: {
		form: new RegForm({submit: submit})
	}});
  }

  public componentDidMount(): void {
    const formElements = this.props.elements.form.props.elements
    this.props.elements.form.addEvents(this.getContent())
    for (let i of Object.keys(formElements))
    {
      formElements[i].addEvents(this.getContent())
    }
  }

  public render(): string {
    return this.props.elements.form.getContent().outerHTML;
  }
}

export { Container };
