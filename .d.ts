declare module "*.hbs";
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
