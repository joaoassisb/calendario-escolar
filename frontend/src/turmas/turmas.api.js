import { http } from "../middlewares/http";

const TurmasApi = {
  loadTurmas() {
    return http.get("/api/turmas");
  },
  loadTurma(id) {
    return http.get(`/api/turmas/${id}`);
  },
  saveTurma(id, turma) {
    return http.post(`/api/turmas/${id || ""}`, turma);
  },
  entrarTurma(codigo) {
    return http.post("/api/turmas/entrar", codigo);
  }
};

export default TurmasApi;
