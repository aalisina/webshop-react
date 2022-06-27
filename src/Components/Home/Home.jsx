import React, { useState } from "react";
import Spinner from "../../Components/Spinner/Spinner";
import useFetch from "../../Services/useFetch";
import { useParams } from "react-router-dom";
import PageNotFound from "../PageNotFound/PageNotFound";

function Home() {
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const { datatype } = useParams();

  const { data: products, loading, error } = useFetch(datatype);

  const filteredProductsByCategory = category
    ? products.filter((p) => p.category === category)
    : products;

  const filteredProductsBySize = products.filter((prod) =>
    prod.skus.find((s) => s.size === parseInt(size))
  );

  const filteredProductsBySizeAndCategory =
    category && size
      ? filteredProductsByCategory.filter((prod) =>
          prod.skus.find((sku) => sku.size === parseInt(size))
        )
      : category
      ? filteredProductsByCategory
      : size
      ? filteredProductsBySize
      : products;

  const cats = products.map((p) => p.category);
  const catUniq = [...new Set(cats)];

  const sizesFiltered = filteredProductsBySizeAndCategory.map((prod) =>
    prod.skus.map((s) => s.size)
  );

  if (loading) return <Spinner />;
  if (products.length === 0) return <PageNotFound />;
  if (error) throw error;
  return (
    <>
      {/* Section*/}
      <section id="filters" className="py-5">
        <div className="container px-4 px-lg-5 mt-5">
          <label htmlFor="category"> Filter by category:</label>{" "}
          <select
            id="category"
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
            }}
          >
            <option value="">All categories</option>
            {catUniq.map((cat) => (
              <option value={cat}>{cat}</option>
            ))}
          </select>
          <br />
          <br />
          <label htmlFor="size">Filter by size:</label>{" "}
          <select
            id="size"
            value={size}
            onChange={(event) => {
              setSize(event.target.value);
            }}
          >
            <option value="">All sizes</option>
            {sizesFiltered.map((prod) =>
              prod.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))
            )}
          </select>
        </div>
      </section>
      <section className="py-5">
        <div className="container px-4 px-lg-5 mt-5">
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {filteredProductsBySizeAndCategory.map((product) => (
              <div className="col mb-5">
                <div className="card h-100">
                  {/* Sale badge*/}
                  <div
                    className="badge bg-dark text-white position-absolute"
                    style={{ top: "0.5rem", right: "0.5rem" }}
                  >
                    Sale
                  </div>
                  {/* Product image*/}
                  <img
                    className="card-img-top"
                    src={`/assets/images/${product.image}`}
                    alt="..."
                  />
                  {/* Product details*/}
                  <div className="card-body p-4">
                    <div className="text-center">
                      {/* Product name*/}
                      <h5 className="fw-bolder">{product.name}</h5>
                      {/* Product reviews*/}
                      <div className="d-flex justify-content-center small text-warning mb-2">
                        <div className="bi-star-fill" />
                        <div className="bi-star-fill" />
                        <div className="bi-star-fill" />
                        <div className="bi-star-fill" />
                        <div className="bi-star-fill" />
                      </div>
                      {/* Product price*/}
                      <span className="text-muted text-decoration-line-through">
                        ${Math.round(product.price * 1.3)}{" "}
                      </span>
                      $ {product.price}
                    </div>
                  </div>
                  {/* Product actions*/}
                  <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div className="text-center">
                      <a className="btn btn-outline-dark mt-auto" href="#">
                        Add to cart
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
