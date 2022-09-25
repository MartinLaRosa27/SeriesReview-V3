import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { EditarReview } from "./assets/EditarReview.jsx";
import axios from "axios";

export const MisReviews = () => {
  const [review, setReview] = useState([]);

  const urlGet = `http://${process.env.REACT_APP_BACKEND_URL}/get-review`;
  const urlDelete = `http://${process.env.REACT_APP_BACKEND_URL}/delete-review`;

  const getReview = async () => {
    try {
      await axios.get(urlGet).then((res) => {
        setReview(res.data);
      });
    } catch (e) {
      setReview([]);
    }
  };

  const deleteReview = async (_id) => {
    try {
      await axios.delete(`${urlDelete}/${_id}`).then((res) => {
        alert(res.data);
      });
    } catch (e) {
      alert("No se pudo eliminar la review");
    }
    window.location.reload(false);
  };

  useEffect(() => {
    getReview();
  }, []);

  return (
    <main className="container mis-reviews">
      <Helmet>
        <title>Mis Reviews | SeriesReview</title>
      </Helmet>
      {review.length === 0 && <h3>No publicaste reviews</h3>}
      {review.map((valor) => {
        return (
          <div className="card" key={valor._id}>
            <div className="card-header">{valor.titulo}</div>
            <div className="card-body">
              <blockquote className="blockquote mb-0">
                <p>{valor.contenido}</p>
                <div>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteReview(valor._id)}
                  >
                    ELIMINAR
                  </button>{" "}
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-toggle="collapse"
                    data-bs-target={`#${valor._id}`}
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                    EDITAR
                  </button>
                  <hr />
                  <div className="collapse" id={valor._id}>
                    <EditarReview review={valor} />
                  </div>
                </div>
              </blockquote>
            </div>
          </div>
        );
      })}
    </main>
  );
};
