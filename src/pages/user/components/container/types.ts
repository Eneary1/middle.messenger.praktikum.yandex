import { Link } from '../../../../components/link/link';

export type ContainerType = {
  class: string,
  elements: {
    dataLink: Link,
    passLink: Link,
    exitLink: Link
  }
};
