import { Block } from "../components/block";
import { Route } from "./route";

class Router {
    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

	private static __instance: Router;
	public routes: Array<Route>;
	public history: History;
	private _currentRoute: null | Route;
	private _rootQuery: string;

    use(pathname: string, block: {new(): Block}) {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery});

        this.routes.push(route);

        return this;
    }

    start(): void {
        window.onpopstate = ((event: PopStateEvent) => {
			const ev: any = event.currentTarget;
            this._onRoute(ev.location.pathname);
        }).bind(this);

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname): void {
        const route = this.getRoute(pathname);
        if (!route) {
            return;
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render();
    }

    go(pathname: string): void {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back(): void {
        this.history.back();
    }

    forward(): void {
        this.history.forward();
    }

    getRoute(pathname): Route | undefined {
        return this.routes.find(route => route.match(pathname));
    }
}
const router = new Router("#root")

export {router}