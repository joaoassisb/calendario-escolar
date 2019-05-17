import { http } from "../middlewares/http";

const ComentariosApi = {
  loadComentarios(eventoId) {
    return http.get(`/api/eventos/${eventoId}/comentarios`);
  },
  saveComentario(id, comentario) {
    const eventoId = comentario.evento._id || comentario.evento;
    return http.post(
      `/api/eventos/${eventoId}/comentarios/${id || ""}`,
      comentario
    );
  },
  deleteEvento(comentario) {
    const eventoId = comentario.evento._id || comentario.evento;
    return http.delete(
      `/api/eventos/${eventoId}/comentarios/${comentario._id}`
    );
  }
};

export default ComentariosApi;
