
export default class API {

    URL_BASE = null;
    headers_Default = {};

    static _setURL_BASE = (URL_BASE) => {
        API.URL_BASE = URL_BASE;
    };

    static _setHeaders_default = (headers_Default) => API.headers_Default = headers_Default;

    static _setToken = (token) => API.token = token;

    static _deleteToken = () => API.token = null;

    _getHeaders(customHeaders = {}) {
        const defaultHeaders = {
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
        if (API.token) defaultHeaders.Authorization = `TOKEN ${API.token}`;
        return { headers: defaultHeaders, ...API.headers_Default, ...customHeaders }
    }

    _getUrl(path) {
        return encodeURI(`${API.URL_BASE}${path}`);
    }

    static async get({ endPoint, params = {} }) {

        if (!endPoint) return console.warn('Param endPoint not found');
        const self = new API();
        let Url = self._getUrl(`${endPoint}?${new URLSearchParams({ ...params })}`)
        return await self.sendRequest(Url, { method: 'GET' });

    }

    static async post({ endPoint, body }) {

        if (!endPoint) return console.warn('Param endPoint not found');
        else if (!body) return console.warn('Param body not found');
        const self = new API();
        let Url = self._getUrl(endPoint)
        return await self.sendRequest(Url, { method: 'POST', body: JSON.stringify(body) });

    }

    static async put({ endPoint, body }) {

        if (!endPoint) return console.warn('Param endPoint not found');
        else if (!body) return console.warn('Param body not found');
        const self = new API();
        let Url = self._getUrl(endPoint)
        return await self.sendRequest(Url, { method: 'PUT', body: JSON.stringify(body) });

    }

    async sendRequest(url, method) {

        const timeout = 20000
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);

        try {

            const response = await fetch(url, {
                ...this._getHeaders(method),
                signal: controller.signal
            });

            clearTimeout(id);

            return { code: response.status, data: await response.json() }

        } catch (error) {
            return { message: `${error}`, status: "catch" };
        }

    }


}