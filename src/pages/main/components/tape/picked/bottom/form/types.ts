import '../../../../../../../../.d';
import { Input } from '../../../../../../../components/input/input';

type ElemType = {
  messageInput: Input
};

type FormType = {
  elements: ElemType,
  events: EventType,
  class: string
};

export { FormType, ElemType };
