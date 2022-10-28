enum METHOD {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	PATCH = 'PATCH',
	DELETE = 'DELETE'
};

type Options = {
	method: METHOD;
	data?: any;
};

type data = Omit<Options, 'method'>;

class HTTPTransport {
	public get(url: string, data: data = {}): Promise<XMLHttpRequest> {
		return this.request(url, {...data, method: METHOD.GET});
	};

	public post(url: string, data: data = {}): Promise<XMLHttpRequest> {
		return this.request(url, {...data, method: METHOD.POST});
	};

	public put(url: string, data: data = {}): Promise<XMLHttpRequest> {
		return this.request(url, {...data, method: METHOD.PUT});
	};

	public patch(url: string, data: data = {}): Promise<XMLHttpRequest> {
		return this.request(url, {...data, method: METHOD.PATCH});
	};

	public delete(url: string, data: data = {}): Promise<XMLHttpRequest> {
		return this.request(url, {...data, method: METHOD.DELETE});
	};

	private request(url: string, options: Options = { method: METHOD.GET }): Promise<XMLHttpRequest> {
		const {method, data} = options;

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open(method, url);

			xhr.onload = function() {
				resolve(xhr);
			};

			xhr.onabort = reject;
			xhr.onerror = reject;
			xhr.ontimeout = reject;

			if (method === METHOD.GET || !data) {
				xhr.send();
			} else {
				xhr.send(data);
			}
		});
	};
} 