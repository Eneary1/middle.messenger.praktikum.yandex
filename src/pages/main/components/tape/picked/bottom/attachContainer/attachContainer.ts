import '../../../../../../../../.d';
import { Block } from '../../../../../../../components/block';
import { Attachment } from '../attachment/attachment';

type TopType = {
  class: string,
  events: EventType,
  elements: {
    Attachment: Attachment
  }
};

class AttachmentContainer extends Block<TopType> {
  public constructor(events?: EventType) {
    super('div', {
      class: 'attachment-container',
      events,
      elements: {
        Attachment: new Attachment(),
      },
    });
  }

  public render(): string {
    return this.props.elements.Attachment.getContent().outerHTML;
  }
}

export { AttachmentContainer };
