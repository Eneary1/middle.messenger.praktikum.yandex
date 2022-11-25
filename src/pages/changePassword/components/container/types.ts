import { Avatar } from '../../../../components/avatar/avatar';
import { PassForm } from '../form/form';

export type ContainerType = {
  classes: object,
  class: string,
  elements: {
    form: PassForm,
    avatar: Avatar
  }
};
