import { http } from "../middlewares/http";

const AuthApi = {
  login(credenciais) {
    return http.post("/api/session", credenciais);
  },
  session() {
    return http.get("/api/session");
  },
  logout() {
    return http.delete("/api/session");
  },
  cadastrarUsuario(usuario) {
    return http.post("/api/usuarios", usuario);
  }
};

export default AuthApi;
