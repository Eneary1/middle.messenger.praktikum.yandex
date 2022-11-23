import '../../../../../../../../.d';
import { Button } from '../../../../../../../components/button/button';
import { Input } from '../../../../../../../components/input/input';
import { AttachmentContainer } from '../attachContainer/attachContainer';

type ElemType = {
  messageInput: Input,
  button: Button,
  attachment: AttachmentContainer
};

type FormType = {
  elements: ElemType,
  events: EventType,
  class: string
};

export { FormType, ElemType };
