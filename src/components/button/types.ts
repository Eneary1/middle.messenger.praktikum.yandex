export type ButtonType<T = string> = {
  text?: T,
  type?: T,
  class?: T,
  name?: T,
  events?: EventType
};

export type ButtonProps<T = string> = {
  text?: T,
  type?: T,
  class?: T,
  name?: T
};
