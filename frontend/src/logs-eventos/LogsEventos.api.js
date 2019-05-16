import { http } from "../middlewares/http";
import { dateStr2Locale } from "../components/formatters";

const LogEventosApi = {
  loadLogs(filtros) {
    return http.get("/api/logs-eventos", filtros);
  },
  saveLog(evento, { edicao = false, exclusao = false }) {
    let mensagem = `adicionou um(a) ${evento.tipo} no dia ${dateStr2Locale(
      evento.data
    )} da matéria ${evento.materia} ${
      evento.pontos ? `de ${evento.pontos} pontos` : "."
    }`;

    if (edicao) {
      mensagem = `alterou o(a) ${evento.tipo} do dia ${dateStr2Locale(
        evento.data
      )} da matéria ${evento.materia} ${
        evento.pontos ? `de ${evento.pontos} pontos` : "."
      }`;
    }

    if (exclusao) {
      mensagem = `excluiu o(a) ${evento.tipo} do dia ${dateStr2Locale(
        evento.data
      )} da matéria ${evento.materia} ${
        evento.pontos ? `de ${evento.pontos} pontos` : "."
      }`;
    }

    return http.post("/api/logs-eventos", {
      turma: evento.turma,
      usuario: evento.usuarioCriador,
      mensagem
    });
  }
};

export default LogEventosApi;
