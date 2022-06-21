import React, { useState } from "react";

const products = [
  {
    id: 1,
    category: "gloves",
    image: "fitness1.jpg",
    name: "Gloves X-tra",
    price: 24.95,
    skus: [
      { sku: "14", size: 7 },
      { sku: "8", size: 8 },
      { sku: "13", size: 5 },
      { sku: "9", size: 6 },
      { sku: "13", size: 4 },
      { sku: "3", size: 9 },
    ],
    description:
      "These gloves will significantly improve your grip so you can lift with ease. Different sizes available.",
  },
  {
    id: 2,
    category: "gloves",
    image: "fitness2.jpg",
    name: "Gloves Grip-R2",
    price: 38.95,
    skus: [
      { sku: "17", size: 8 },
      { sku: "29", size: 9 },
      { sku: "14", size: 7 },
      { sku: "13", size: 6 },
    ],
    description:
      "These gloves will never fail. Ideal for heavy lifters and everyone trying to get to the next level. Different sizes available.",
  },
  {
    id: 3,
    category: "pants",
    image: "fitness3.jpg",
    name: "Pants Extreme Fit",
    price: 95.95,
    skus: [
      { sku: "30", size: 32 },
      { sku: "28", size: 36 },
      { sku: "14", size: 38 },
    ],
    description:
      "Look stylish in the gym while you're working out. Different sizes available.",
  },
  {
    id: 4,
    category: "pants",
    image: "fitness4.jpg",
    name: "Pants Extreme Comfort",
    price: 115.95,
    skus: [
      { sku: "14", size: 32 },
      { sku: "28", size: 36 },
      { sku: "14", size: 42 },
    ],
    description:
      "Look stylish in the gym while you're working out. These are the most comfortable pants you'll ever wear. Different sizes available.",
  },
  {
    id: 5,
    category: "shirts",
    image: "fitness5.jpg",
    name: "Shirt Extreme Fit",
    price: 35.95,
    skus: [
      { sku: "29", size: "S" },
      { sku: "28", size: "M" },
      { sku: "14", size: "L" },
      { sku: "17", size: "XL" },
    ],
    description:
      "Look stylish in the gym while you're working out. Different sizes available.",
  },
  {
    id: 6,
    category: "shirts",
    image: "fitness6.jpg",
    name: "Shirt Extreme Comfort",
    price: 35.95,
    skus: [
      { sku: "29", size: "S" },
      { sku: "28", size: "M" },
      { sku: "14", size: "L" },
      { sku: "17", size: "XXL" },
    ],
    description:
      "Look stylish in the gym while you're working out. These is the most comfortable shirt you'll ever wear. Different sizes available.",
  },
  {
    id: 7,
    category: "shoes",
    image: "fitness7.jpg",
    name: "Shoes Extreme Fit",
    price: 135.95,
    skus: [
      { sku: "27", size: 34 },
      { sku: "28", size: 35 },
      { sku: "14", size: 36 },
      { sku: "17", size: 38 },
    ],
    description:
      "Look stylish in the gym while you're working out. These are the most comfortable shoes you'll ever wear. Different sizes available.",
  },
  {
    id: 8,
    category: "shoes",
    image: "fitness8.jpg",
    name: "Shoes Extreme Comfort",
    price: 155.95,
    skus: [
      { sku: "27", size: 34 },
      { sku: "28", size: 35 },
      { sku: "14", size: 36 },
      { sku: "17", size: 38 },
    ],
    description:
      "Look stylish in the gym while you're working out. These are the most comfortable shoes you'll ever wear. Different sizes available.",
  },
];

function Home() {
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");

  const filteredProductsByCategory = category
    ? products.filter((p) => p.category === category)
    : products;

  const cats = products.map((p) => p.category);
  const catUniq = [...new Set(cats)];
  
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
            {catUniq.map((cat)=> (<option value={cat}>{cat}</option>))}
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
            <option value="8">8</option>
            <option value="9">9</option>
          </select>
        </div>
      </section>
      <section className="py-5">
        <div className="container px-4 px-lg-5 mt-5">
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {products.map((product) => (
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
