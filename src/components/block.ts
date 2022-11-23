import '../../.d';
import { v4 as makeUUID } from 'uuid';
import { EventBus } from '../utils/eventBus';
import { modulateClasses } from '../utils/converter';

type MetaInfo = {
  tagName: string;
  props: object;
};

enum EVENTS {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_CDU = 'flow:component-did-update',
  FLOW_RENDER = 'flow:render',
}

class Block<Props extends object = object> {
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

  private _isHidden: boolean = false;

  private _allowID: boolean = true;

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

  public setProps = (newProps: {[key: string]: unknown}) => {
    if (!newProps) {
      return;
    }
    const oldProps = { ...this.props }
    Object.assign(this.props, newProps);
    this._eventBus().emit(EVENTS.FLOW_CDU, oldProps, this.props);
  };

  private _render(): void {
    const block = this._convertElements(this.render());
    const childArray = Array.from(block.children);
    this._element.innerHTML = '';
    if (childArray.length === 0) {
      this._element.innerHTML = block.innerHTML;
    } else {
      childArray.forEach((i) => {
        this._element.appendChild(i);
      });
    }
    this._addEvents();
    this.modulateClasses((this.props as {classes: object}).classes)
  }

  private _convertElements(str: string) {
    const { elements = {} } = this.props as IBaseType<object>;
    const banch = document.createElement('div');
    banch.innerHTML = str;
    Object.keys(elements).forEach((i) => {
      let elem = banch.querySelector(`[data-id~="${elements[i]?._id}"]`);
      if (elem) elem.replaceWith(elements[i].getContent());
    });
    return banch;
  }

  private _addEvents() {
    const { events = {} } = this.props as IBaseType;

    Object.keys(events).forEach((eventName) => {
      this._element.addEventListener(eventName, events[eventName]);
    });
  }

  /**
   * Return a string that represents DOM elements or text
   */

  public render(): string {
    return '';
  }

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
    if (this._allowID) { elem.dataset.id = this._id; }
    return elem;
  }

  public toggle() {
    if (this._isHidden) {
      this._element.style.display = '';
      this._isHidden = false;
    } else {
      this._element.style.display = 'none';
      this._isHidden = true;
    }
  }

  public show() {
    this._element.style.display = '';
    this._isHidden = false;
  }

  public hide() {
    this._element.style.display = 'none';
    this._isHidden = true;
  }

  public modulateClasses(classes: object) {
    if (classes) {
      modulateClasses(this._element, classes);
    }
  }
}

export { Block };
