import { http } from "../middlewares/http";

const EventosApi = {
  loadEventos(filtros) {
    return http.get("/api/eventos", filtros);
  },
  saveEvento(id, evento) {
    return http.post(`/api/eventos/${id || ""}`, evento);
  }
};

export default EventosApi;
