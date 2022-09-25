import React, { useEffect, useState } from "react";
import { BiStar } from "react-icons/bi";
import axios from "axios";

export const TodasReviews = () => {
  const [review, setReview] = useState([]);
  const url = `http://${process.env.REACT_APP_BACKEND_URL}/get-review`;

  const getReview = async () => {
    try {
      await axios.get(url).then((res) => {
        setReview(res.data);
      });
    } catch (e) {
      setReview([]);
    }
  };

  useEffect(() => {
    getReview();
  }, []);

  return (
    <main className="container todas-reviews">
      {review.length === 0 && <h3>No hay reviews guardadas</h3>}
      {review.map((valor) => {
        return (
          <div className="card" key={valor._id}>
            <div className="card-header">{valor.titulo}</div>
            <div className="card-body">
              <blockquote className="blockquote mb-0">
                <p>{valor.contenido}</p>
                <footer className="blockquote-footer">
                  Autor |{" "}
                  <cite title="Source Title">
                    {valor.calificacionId} <BiStar />
                  </cite>
                </footer>
              </blockquote>
            </div>
          </div>
        );
      })}
    </main>
  );
};
