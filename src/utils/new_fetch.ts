enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type Options = {
  readonly method?: METHOD,
  data?: any,
  timeout?: number
};

function queryStringify(data: any) {
  if (typeof data !== 'object') {
		throw new Error('Data must be object');
	}

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

class NewFetch {
  public get = (url: string, options: Options = {}) => {
    return this.request(url, {...options, method: METHOD.GET}, options.timeout);
  };

  public post = (url: string, options = {} as Options) => {
    return this.request(url, {...options, method: METHOD.POST}, options.timeout);
  };

  public put = (url: string, options = {} as Options) => {
    return this.request(url, {...options, method: METHOD.PUT}, options.timeout);
  };

  public delete = (url: string, options = {} as Options) => { 
    return this.request(url, {...options, method: METHOD.DELETE}, options.timeout);
  };

  private request = (url: string, options = {} as Options, timeout = 5000): Promise<XMLHttpRequest> => {
    const {headers = {}, method, data} = options as any;

    return new Promise(function(resolve, reject) {
      if (!method) {
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHOD.GET;

      xhr.open(
        method, isGet && !!data ? `${url}${queryStringify(data)}` : url,
      );

      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });
  
      xhr.onload = function() {
        resolve(xhr);
      };
  
      xhr.onabort = reject;
      xhr.onerror = reject;
  
      xhr.timeout = timeout;
      xhr.ontimeout = reject;
      
      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}

export { NewFetch };
