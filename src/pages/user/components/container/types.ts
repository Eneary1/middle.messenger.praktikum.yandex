import { Avatar } from '../../../../components/avatar/avatar';
import { Link } from '../../../../components/link/link';

export type ContainerType = {
  classes: object,
  class: string,
  elements: {
    dataLink: Link,
    passLink: Link,
    exitLink: Link,
    goToMain: Link,
    avatar: Avatar
  }
};
