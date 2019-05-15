import { http } from "../middlewares/http";

const EventosApi = {
  loadEventos(filtros) {
    return http.get("/api/eventos", filtros);
  },
  createEvento(evento) {
    return http.post("/api/eventos", evento);
  }
};

export default EventosApi;
