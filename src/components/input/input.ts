import '../../../.d';
import { Block } from '../block';
import { InputProps, InputType } from './types';

/**
 * Function for a fast main container block
 */

class Input extends Block<InputType> {
  public constructor(inputProps: InputProps, events?: EventType) {
    super('input', { ...inputProps, events });
  }

  public render(): string {
    if (this.props.type) this.getContent().setAttribute('type', this.props.type);
    if (this.props.placeHolder) this.getContent().setAttribute('placeholder', this.props.placeHolder);
    return '';
  }
}

export { Input };
