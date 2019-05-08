/* eslint no-console:0 */
import fetch from "cross-fetch";
import { stringify } from "query-string";

function _http(url, options) {
  const data = {
    method: options.method,
    body: options.body
  };

  if (!options.isFormData) {
    data.body = JSON.stringify(options.body);
    data.headers = {
      "Content-Type": "application/json"
    };
  }

  return fetch(url, data).then(res => {
    if (res.status >= 400) {
      return res.text().then(message => {
        const err = new Error(message);

        err.status = res.status;
        throw err;
      });
    }

    return res
      .json()
      .catch(err => {
        console.warn(err);

        return {};
      })
      .then(data => {
        if (res.status >= 400) {
          const e = new Error(data.message || "Erro desconhecido");

          e.status = res.status;
          e.stack = data.stack;
          throw e;
        }

        return data;
      });
  });
}

export const http = {
  auto({ url, method, body, isFormData }) {
    switch (method) {
      case "POST":
        return this.post(url, body, { isFormData });

      case "PUT":
        return this.put(url, body);

      case "DELETE":
        return this.delete(url);

      default:
        return this.get(url, body);
    }
  },
  get(url, query) {
    const q = stringify(query);

    return _http(`${url}${q && `?${q}`}`, {
      method: "GET"
    });
  },
  post(url, body, { isFormData = false } = {}) {
    return _http(url, {
      method: "POST",
      isFormData,
      body
    });
  },
  put(url, body) {
    return _http(url, {
      method: "PUT",
      body
    });
  },
  delete(url) {
    return _http(url, {
      method: "DELETE"
    });
  }
};
