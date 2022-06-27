import React from "react";
import { Link, NavLink } from "react-router-dom";

const activeStyle = {
  className: "nav-link active",
};

function Navigation() {
  return (
    <>
      {/* Navigation*/}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container px-4 px-lg-5">
          <Link className="navbar-brand" to="/">
            <strong>Health</strong> & Fitness
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
              <li className="nav-item">
                <NavLink
                  activeStyle={activeStyle}
                  className="nav-link"
                  aria-current="page"
                  to="/products"
                >
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  activeStyle={activeStyle}
                  className="nav-link"
                  to="/cart"
                >
                  Cart
                </NavLink>
              </li>
            </ul>
            <form className="d-flex">
              <Link to="cart">
                <button className="btn btn-outline-dark" type="submit">
                  <i className="bi-cart-fill me-1" />
                  Cart
                  <span className="badge bg-dark text-white ms-1 rounded-pill">
                    0
                  </span>
                </button>
              </Link>
            </form>
          </div>
        </div>
      </nav>
      {/* Header*/}
      <header className="bg-dark py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="text-center text-white">
            <h1 className="display-4 fw-bolder">Stay healthy and fit</h1>
            <p className="lead fw-normal text-white-50 mb-0">
              A wide collection of exercise and fitness equipment just a few
              clicks away. Amazing discounts, prices, and customer reviews when
              it comes to fitness equipment
            </p>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navigation;
