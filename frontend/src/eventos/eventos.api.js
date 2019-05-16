import { http } from "../middlewares/http";
import LogsEventosApi from "../logs-eventos/LogsEventos.api";

const EventosApi = {
  loadEventos(filtros) {
    return http.get("/api/eventos", filtros);
  },
  loadEvento(id) {
    return http.get(`/api/eventos/${id}`);
  },
  saveEvento(id, evento) {
    return http.post(`/api/eventos/${id || ""}`, evento).then(evento => {
      return LogsEventosApi.saveLog(evento, { edicao: id ? true : false });
    });
  },
  deleteEvento(evento) {
    return http.delete(`/api/eventos/${evento._id}`).then(() => {
      return LogsEventosApi.saveLog(evento, { exclusao: true });
    });
  }
};

export default EventosApi;
