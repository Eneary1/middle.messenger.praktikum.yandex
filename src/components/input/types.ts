import '../../../.d';

export type InputProps<T = string> = {
  class?: T,
  id?: T,
  name?: T,
  type?: T,
  placeHolder?: T
};

export type InputType<T = string> = {
  class?: T,
  id?: T,
  events?: EventType,
  name?: T,
  type?: T,
  placeHolder?: T
};
