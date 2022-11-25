import { Avatar } from '../../../../components/avatar/avatar';
import { Link } from '../../../../components/link/link';

export type ContainerType = {
  classes: object,
  userData: {[x: string]: unknown},
  class: string,
  elements: {
    dataLink: Link,
    passLink: Link,
    exitLink: Link,
    goToMain: Link,
    avatar: Avatar
  }
};
