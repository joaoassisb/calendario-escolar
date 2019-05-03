/* eslint no-console:0 */
import fetch from "cross-fetch";
import { stringify } from "query-string";

function _http(url, options) {
  return fetch(url, {
    method: options.method,
    body: JSON.stringify(options.body),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
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
  get(url, query) {
    const q = stringify(query);

    return _http(`${url}${q && `?${q}`}`, {
      method: "GET"
    });
  },
  post(url, body) {
    return _http(url, {
      method: "POST",
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
