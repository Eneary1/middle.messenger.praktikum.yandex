import '../../../../../.d';
import { Block } from '../../../../components/block';
import { AuthorForm } from "../form/form"
import { ContainerType } from "./types"
import { HASHES } from '../../../../utils/hash_enum';
import { routeFunc } from '../../../../utils/route_func';
import { showInputs } from '../../../../utils/show_inputs';

/**
 * Function for a fast main container block
 */

function submit(e: SubmitEvent) {
  e.preventDefault();
  const form = e.target as HTMLFormElement
  const inputs = Array.from(form.querySelectorAll("input"))
  for (let i of inputs) {
    if (i.classList.contains("invalid")) return;
    if (i.value === '') {
      i.classList.add("invalid");
      return;
    }
  }
  showInputs(form);
  routeFunc(HASHES.MAIN);
}

class Container extends Block<ContainerType> {
  public constructor() {
    super('div', { class: 'container', elements: {
		form: new AuthorForm({submit: submit})
	}});
  }

  public componentDidMount(): void {
    const formElements = this.props.elements.form.props.elements
    this.props.elements.form.addEvents(this.getContent())
    formElements.loginInput.addEvents(this.getContent())
    formElements.passInput.addEvents(this.getContent())
    formElements.link.addEvents(this.getContent())
  }

  public render(): string {
    return this.props.elements.form.getContent().outerHTML;
  }
}

export { Container };
