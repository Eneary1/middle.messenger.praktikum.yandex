import "../../.d";
import { EventBus } from '../utils/event_bus';
import { modulateClasses } from '../utils/converter';
import {v4 as makeUUID} from 'uuid';

type MetaInfo = {
  tagName: string;
  props: object;
};

enum EVENTS {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_CDU = 'flow:component-did-update',
  FLOW_RENDER = 'flow:render'
}

class Block<Props extends object> {
  public constructor(tagName: string = 'div', props: Props = {} as Props) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props,
    };
    this._id = makeUUID();
    this.props = this._makePropsProxy(props);
    this._eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(EVENTS.INIT);
  }

  private _element: HTMLElement;
  private _meta: MetaInfo;
  private _eventBus: () => EventBus;
  public props: Props;
  private _id = null;

  public getID(): string {
    return this._id;
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(EVENTS.INIT, this._init.bind(this));
    eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources(): void {
    const { tagName } = this._meta;
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

  private _componentDidUpdate(oldProps: Props, newProps: Props): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  public componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    return true;
  }

  public setProps = (newProps: Props) => {
    if (!newProps) {
      return;
    }
    Object.assign(this.props, newProps);
    this._eventBus().emit(EVENTS.FLOW_CDU, { ...this.props }, this.props);
  };

  private _render(): void {
    const block = this.render();
    this._element.innerHTML = block;
  }

  public addEvents(wrapper: HTMLElement) {
    const {events = {}} = this.props as IBaseType;

    Object.keys(events).forEach(eventName => {
      wrapper.querySelector(`[data-id~="${this.getID()}"]`)?.addEventListener(eventName, events[eventName]);
    });
  }

  /**
 *Should always return a string that represents a DOM element or simple text
*/

  public render(): string {
    return '';
  }

  /**
 *Returns DOM element
*/

  public getContent(): HTMLElement {
    return this._element;
  }

  private _makePropsProxy(props: Props): Props {
    const self = this;
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, value) {
        target[prop] = value;
        self._eventBus().emit(EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  private _createDocumentElement(tagName: string): HTMLElement {
    const propsRef = this.props as IBaseType;
    const elem = document.createElement(tagName);
    if (propsRef.class) elem.classList.add(propsRef.class);
    if (propsRef.id) elem.id = propsRef.id;
    if (propsRef.name) elem.setAttribute('name', propsRef.name);
    elem.dataset.id = this._id
    return elem;
  }

  public show() {
    this.getContent().style.display = 'block';
  }

  public hide() {
    this.getContent().style.display = 'none';
  }

  public modulateClasses(classes: object) {
    modulateClasses(this._element, classes);
  }
}

export { Block };
