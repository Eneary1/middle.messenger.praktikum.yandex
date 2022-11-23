import { queryString } from "./queryString";

enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type Options = {
  readonly method: METHOD,
  readonly timeout?: number,
  readonly data?: any,
  readonly headers?: {
    [x: string]: any
  }
};

type MethodOptions = Omit<Options, "method">;

class NewFetch {
  public get = (url: string, options: MethodOptions = {}) => this.request(url, { ...options, method: METHOD.GET }, options.timeout);

  public post = (url: string, options = {} as MethodOptions) => this.request(url, { ...options, method: METHOD.POST }, options.timeout);

  public put = (url: string, options = {} as MethodOptions) => this.request(url, { ...options, method: METHOD.PUT }, options.timeout);

  public delete = (url: string, options = {} as MethodOptions) => this.request(url, { ...options, method: METHOD.DELETE }, options.timeout);

  private request = (url: string, options = {} as Options, timeout = 5000): Promise<XMLHttpRequest> => {
    const { headers = {}, method, data } = options as Options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHOD.GET;

      xhr.open(method, isGet && !!data ? `${url}${queryString(data)}` : url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        if (xhr.status === 400 || xhr.status === 401) reject()
        resolve(xhr);
      };

      xhr.withCredentials = true;
      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(queryString(data));
      }
    });
  };
}

export { NewFetch };
