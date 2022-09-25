import axios from "axios";
import React, { useState } from "react";
import { Helmet } from "react-helmet";

export const PublicarReview = () => {
  const [review, setReview] = useState({
    titulo: "",
    contenido: "",
    calificacion: 0,
  });

  const url = `http://${process.env.REACT_APP_BACKEND_URL}/post-review`;

  const postReview = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(url, {
          titulo: review.titulo,
          contenido: review.contenido,
          calificacion: review.calificacion,
        })
        .then((res) => {
          alert(res.data);
        });
    } catch (e) {
      alert("No se pudo guardar la review");
    }
    window.location.reload(false);
  };

  return (
    <div className="container publiar-review">
      <Helmet>
        <title>Publicar Review | SeriesReview</title>
      </Helmet>
      <form onSubmit={(e) => postReview(e)}>
        <div className="mb-3 publicar-review">
          <label htmlFor="titulo" className="form-label">
            Titulo Serie
          </label>
          <input
            type="text"
            className="form-control"
            name="titulo"
            maxLength="25"
            minLength="3"
            placeholder="Umbrella Academy"
            required
            value={review.titulo}
            onChange={(e) =>
              setReview({
                ...review,
                [e.target.name]: e.target.value,
              })
            }
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="contenido" className="form-label">
            Review
          </label>
          <input
            type="text"
            className="form-control"
            name="contenido"
            placeholder="Muy buena serie, pero..."
            maxLength="90"
            minLength="10"
            value={review.contenido}
            onChange={(e) =>
              setReview({
                ...review,
                [e.target.name]: e.target.value,
              })
            }
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="calificacion" className="form-label">
            Calificacion
          </label>
          <select
            className="form-select text-uppercase"
            aria-label="Default select example "
            name="calificacion"
            min="0"
            max="5"
            required
            value={review.calificacion}
            onChange={(e) =>
              setReview({
                ...review,
                [e.target.name]: e.target.value,
              })
            }
          >
            <option defaultValue="0">Ingrese Calificación</option>
            <option value="5">Excelente</option>
            <option value="4">Muy buena</option>
            <option value="3">buena</option>
            <option value="2">regular</option>
            <option value="1">mala</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Publicar
        </button>
      </form>
    </div>
  );
};
