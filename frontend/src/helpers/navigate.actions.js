import { push, goBack, replace } from "react-router-redux";
import { stringify } from "query-string";

export const navigate = (
  uri = "/",
  query,
  replaceHistory = false
) => dispatch => {
  const qs = stringify(query);
  let route = uri;

  if (qs) {
    route += `?${qs}`;
  }

  dispatch(replaceHistory ? replace(route) : push(route));
};

export const navigateBack = () => dispatch => {
  dispatch(goBack());
};
