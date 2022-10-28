import {EventBus} from "./event_bus" 
import {modulateClasses} from "./converter"

type metaInfo = {
	tagName: string;
	props: object;
}

enum EVENTS {
	INIT = "init",
	FLOW_CDM = "flow:component-did-mount",
	FLOW_CDU = "flow:component-did-update",
	FLOW_RENDER = "flow:render"
}

class Block {
	public constructor(tagName: string = "div", props: object = {}) {
		const eventBus = new EventBus();
		this._meta = {
			tagName,
			props
		};
		this.props = this._makePropsProxy(props);
		this._eventBus = () => eventBus;
		this._registerEvents(eventBus);
		eventBus.emit(EVENTS.INIT);
	}

	private _element: HTMLElement;
	private _meta: metaInfo;
	private _eventBus: () => EventBus; 
	public props: any;

	private _registerEvents(eventBus: EventBus) {
		eventBus.on(EVENTS.INIT, this._init.bind(this));
		eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	private _createResources(): void {
		const {tagName} = this._meta;
		this._element = this._createDocumentElement(tagName);
	}

	private _init(): void {
		this._createResources();
		this._render();
		this._dispatchComponentDidMount();
	}

	private _componentDidMount(): void {
		this.componentDidMount();
	}

	public componentDidMount() {}

	private _dispatchComponentDidMount(): void {
		this._eventBus().emit(EVENTS.FLOW_CDM);
	}

	private _componentDidUpdate(oldProps: object, newProps: object): void {
		const response = this.componentDidUpdate(oldProps, newProps);
		if (!response) {
		  return;
		}
		this._render();
	}

	public componentDidUpdate(oldProps: object, newProps: object): boolean {
		return true;
	}

	public setProps = (nextProps: object) => {
		if (!nextProps) {
			return;
		}
		let oldProps = {}
		for (let i = 0; i < Object.keys(this.props).length; i++) {
			oldProps[Object.keys(this.props)[i]] = this.props[Object.keys(this.props)[i]] 
		}
		Object.assign(this.props, nextProps)
		console.log(this.props)
		this._eventBus().emit(EVENTS.FLOW_CDU, oldProps, this.props)
	};

	private _render(): void {
		const block = this.render();
		this._element.innerHTML = block;
	}

/** 
 *Should always return a string that represents a DOM element
*/

	public render(): string {
		return "";
	}

/** 
 *Returns DOM element
*/

	public getContent(): HTMLElement{
		return this._element;
	}

	private _makePropsProxy(props: object): any {
		const self = this;
		return new Proxy(props, {
			get(target, prop) {
				const value = target[prop];
				return typeof value === "function" ? value.bind(target) : value;
			},
			set(target, prop, value) {
				target[prop] = value;
				self._eventBus().emit(EVENTS.FLOW_CDU, {...target}, target);
				return true;
			},
			deleteProperty() {
				throw new Error("Нет доступа");
			}
		});
	}

	private _createDocumentElement(tagName: string): HTMLElement {
		const elem = document.createElement(tagName)
		if (this.props.class) elem.classList.add(this.props.class)
		if (this.props.id) elem.id = this.props.id
		return elem;
	}

	public show() {
		this.getContent().style.display = "block";
	}

	public hide() {
		this.getContent().style.display = "none";
	}

	public modulateClasses(classes: object) {
		modulateClasses(this._element, classes)
	}
}

export {Block}
