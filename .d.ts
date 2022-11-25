declare module "*.hbs"{
	export default function(a?: any): string
}
declare module "*.scss";
declare module "uuid" {
	export function v4(): string
}

type ChatType = {
	class: string,
	content: string
}[]

type Func = Function;

type EventType<GenType = Function> = {
  click?: GenType,
  focus?: GenType,
  blur?: GenType,
  submit?: GenType
}

type TemplateType = {
	templator: (a?: any) => string,
	tmplObject?: any
  }

interface IBaseType<ElementType extends object = object> {
  class?: string,
  id?: string,
  name?: string
  elements?: ElementType,
  events?: EventType,
  template?: TemplateType
}

declare interface Socket{
  socket: WebSocket;
  socketChange(): void;
}

interface Window { 
  barsReload: Array<() => void>,
  chat: Array<{[x: string]: any}>,
  chatUpdate: Array<() => void>,
  socket: Socket,
  bottom: Array<any>,
  avatar: string
}