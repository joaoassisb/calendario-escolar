import { http } from "../middlewares/http";
import { dateStr2Locale } from "../components/formatters";

const LogEventosApi = {
  loadLogs(filtros) {
    return http.get("/api/logs-eventos", filtros);
  },
  saveLog(evento) {
    return http.post("/api/logs-eventos", {
      turma: evento.turma,
      usuario: evento.usuarioCriador,
      mensagem: `adicionou um(a) ${evento.tipo} no dia ${dateStr2Locale(
        evento.data
      )} da matéria ${evento.materia} ${
        evento.pontos ? `de ${evento.pontos} pontos` : "."
      }`
    });
  }
};

export default LogEventosApi;
