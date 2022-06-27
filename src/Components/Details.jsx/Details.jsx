import React from "react";
import "./details.css";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../../Services/useFetch";
import Spinner from "../Spinner/Spinner";
import PageNotFound from "../PageNotFound/PageNotFound";

function Details() {
  const { datatype, id } = useParams();
  const { data: product, loading, error } = useFetch(`${datatype}/${id}`);
  const navigate = useNavigate();

  if (loading) return <Spinner />;
  if (Object.keys(product).length === 0) return <PageNotFound />;
  if (error) throw error;

  return (
    <>
      <main>
        <div className="container col-xxl-8 px-4 py-5">
          <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
            <div className="col-10 col-sm-8 col-lg-6">
              <img
                src={`/assets/images/${product.image}`}
                className="d-block mx-lg-auto img-fluid"
                alt="Bootstrap Themes"
                width={700}
                height={500}
                loading="lazy"
              />
            </div>
            <div className="col-lg-6">
              <h1 className="display-5 fw-bold lh-1 mb-3">{product.name}</h1>
              <p className="lead">{product.description}</p> <br />
              <p className="lead"> ${product.price}</p>
              <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                <button
                  onClick={() => navigate("/cart")}
                  type="button"
                  className="btn btn-primary btn-lg px-4 me-md-2"
                >
                  Add to cart
                </button>
                <label htmlFor="size" className="fw-bold mt-2">
                  Select size:
                </label>{" "}
                <select id="size">
                  <option value="">Select size: </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Details;
