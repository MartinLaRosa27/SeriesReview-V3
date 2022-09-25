import axios from "axios";
import React, { useState } from "react";
import { Helmet } from "react-helmet";

export const EditarReview = (props) => {
  const [review, setReview] = useState({
    titulo: "",
    contenido: "",
  });

  const url = `http://${process.env.REACT_APP_BACKEND_URL}/patch-review`;

  const patchReview = async (e) => {
    e.preventDefault();
    try {
      await axios
        .patch(`${url}/${props.review._id}`, {
          titulo: review.titulo,
          contenido: review.contenido,
          calificacion: review.calificacion,
        })
        .then((res) => {
          alert(res.data);
        });
    } catch (e) {
      alert("No se pudo modificar la review");
    }
    window.location.reload(false);
  };

  return (
    <div className="container publiar-review">
      <Helmet>
        <title>Publicar Review | SeriesReview</title>
      </Helmet>
      <form onSubmit={(e) => patchReview(e)}>
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
            placeholder={props.review.titulo}
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
            placeholder={props.review.contenido}
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
        <button type="submit" className="btn btn-primary">
          Editar
        </button>
      </form>
    </div>
  );
};
