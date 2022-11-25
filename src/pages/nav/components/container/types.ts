import { Link } from '../../../../components/link/link';

export type ContainerType = {
  class?: string,
  classes?: object,
  elements: {
    enter: Link,
    reg: Link,
    main: Link,
    profile: Link,
    pass: Link,
    data: Link,
    page404: Link,
    page500: Link
  }
};
