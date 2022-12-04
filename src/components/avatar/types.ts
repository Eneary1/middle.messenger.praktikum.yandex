export type AvatarType<T = string> = {
  text?: T,
  type?: T,
  class?: T,
  name?: T,
  events?: EventType,
  src?: T
};

export type AvatarProps<T = string> = {
  text?: T,
  type?: T,
  class?: T,
  name?: T,
  src?: T
};
