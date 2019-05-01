import { createReducer } from '../helpers/create-reducer';
import { http } from '../helpers/http';

const actionType = 'RECEIVE_SESSION';

const AuthApi = {
  login({ email, password }) {
    return http.post('/api/session', {
      email,
      password
    });
  },
  session() {
    return http.get('/api/session');
  },
  logout() {
    return http.delete('/api/session');
  }
};

const receiveSession = (session) => ({
  type: actionType,
  session
});

export const login = (data) => (dispatch) =>
  AuthApi.login(data).then(
    (session) => {
      dispatch(receiveSession(session));
    },
    (err) => {
      dispatch(receiveSession({}));

      throw err;
    }
  );

export const loadSession = () => (dispatch) =>
  AuthApi.session().then((session) => {
    dispatch(receiveSession(session));
  });

export const logout = () => (dispatch) =>
  AuthApi.logout().then(() => {
    dispatch(receiveSession({}));

    return loadSession()(dispatch);
  });

export default createReducer(
  {},
  {
    [actionType](state, action) {
      return action.session;
    }
  }
);
