import { Block } from "../components/block";

function isEqual(lhs: string, rhs: string): boolean {
	return lhs === rhs;
  }
  
  function render(query: string, block: Block) {
	const root = document.querySelector(query);
    root.innerHTML = "";
	root.appendChild(block.getContent());
	return root;
  }

  type RouteType = {
	rootQuery: string
  }

class Route<T extends RouteType = RouteType> {
    constructor(pathname: string, view: {new(): Block}, props: T) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

	private _pathname: string;
	private _blockClass: {new(): Block};
	private _block: Block;
	private _props: T;

    public navigate(pathname: string): void {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    public leave(): void {
        if (this._block) {
            const root = document.querySelector(this._props.rootQuery);
            root.innerHTML = "";
        }
    }

    public match(pathname: string): boolean {
        return isEqual(pathname, this._pathname);
    }

    public render(): void {
        if (!this._block) {
            this._block = new this._blockClass();
        }
        render(this._props.rootQuery, this._block);
    }
}

export {Route}