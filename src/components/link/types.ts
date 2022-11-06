import '../../../.d';

export type LinkProps<T = string> = {
  id?: T,
  href?: T,
  class?: T,
  text?: T
};

export type LinkType<T = string> = {
  class?: T,
  id?: T,
  events?: EventType,
  href?: T,
  text?: T
};
