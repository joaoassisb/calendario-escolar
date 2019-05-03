import { replace } from "react-router-redux";

/* eslint no-console:0 */

export const authMiddleware = store => next => action => {
  try {
    return Promise.resolve(next(action)).catch(err => {
      const { pathname, search } = store.getState().router.location;

      if (err.status === 401) {
        const redirectTo = encodeURI(`${pathname}${search}`);

        console.warn(err.message);
        store.dispatch(replace(`/login?redirectTo=${redirectTo}`));

        return;
      }

      throw err;
    });
  } catch (err) {
    console.error("Caught an exception!", err);
    throw err;
  }
};
