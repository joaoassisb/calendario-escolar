import { http } from "../middlewares/http";

const EventosApi = {
  loadEventos(filtros) {
    return http.get("/api/eventos", filtros);
  },
  loadEvento(id) {
    return http.get(`/api/eventos/${id}`);
  },
  saveEvento(id, evento) {
    return http.post(`/api/eventos/${id || ""}`, evento);
  },
  deleteEvento(id) {
    return http.delete(`/api/eventos/${id}`);
  }
};

export default EventosApi;
