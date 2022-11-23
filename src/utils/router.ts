import { Block } from "../components/block";
import { ROUTES } from "./routeEnum";
import { Route } from "./route";
import { NewFetch } from "./newFetch";

type RouteType = ROUTES | string;

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

    public use(pathname: RouteType, block: {new(): Block}) {
        if (this.getRoute(pathname)) return;
        const route = new Route(pathname, block, {rootQuery: this._rootQuery});

        this.routes.push(route);
        return this;
    }

    private _is404(): boolean {
        const route = this.getRoute(window.location.pathname);
        if (!route || window.location.pathname === "/404") {
            this.noPushGo(ROUTES.ROUTE404)
            return true;
        }
        return false
    }

    public start(): void {

        window.onpopstate = ((event: PopStateEvent) => {
			const ev: any = event.currentTarget;
            this._onRoute(ev.location.pathname);
        }).bind(this);

        const newFetch = new NewFetch();
        newFetch.get("https://ya-praktikum.tech/api/v2/auth/user")
        .then(()=>{
            if (!this._is404()) {
                if (window.location.pathname !== "/sign-up" && window.location.pathname !== "/") this._onRoute(window.location.pathname); else {
                    this.noPushGo(ROUTES.MAIN);
                }
            }
        })
        .catch(()=>{
            if (!this._is404()) {
                if (window.location.pathname !== "/sign-up") this.noPushGo(ROUTES.ENTER); else {
                    this.noPushGo(ROUTES.REG);
                }
            }
        })
        
        // this._onRoute(window.location.pathname);
    }

    private _onRoute(pathname: string): void {
        const route = this.getRoute(pathname);
        if (!route) {
            this.noPushGo(ROUTES.ROUTE404)
            return;
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render();
    }

    public go(pathname: RouteType): void {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    public refresh(route?: RouteType) {
        if (route) {
            location.assign(`${location.protocol}/${location.host}${route}`)
        } else {
            location.assign(`${location.protocol}/${location.host}${location.pathname}`)
        }
    }

    public noPushGo(pathname: RouteType): void {
        this.history.replaceState({}, '', pathname);
        this._onRoute(pathname);
    }

    public back(): void {
        this.history.back();
    }

    public forward(): void {
        this.history.forward();
    }

    public getRoute(pathname: RouteType): Route | undefined {
        return this.routes.find(route => route.match(pathname));
    }

    public selectedChat(): null | string {
        if (!location.pathname.match(/(?<=\/)\d+/)) return null;
        else return location.pathname.match(/(?<=\/)\d+/)[0]
    }
}
const router = new Router("#root")

export {router}