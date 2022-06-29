import React, { useMemo } from "react";
import useFetchAll from "../../Services/useFetchAll";
import Spinner from "../../Components/Spinner/Spinner";

function Checkout({ cart, updateQuantity }) {
  const prods = cart.map((i) => i.id);
  const { data: products, loading, error } = useFetchAll(prods);

  const renderItem = (itemInCart) => {
    const { id, sku, quantity } = itemInCart;

    const { price, name, skus, description } = products.find(
      (p) => p.id === parseInt(id)
    );

    const { size } = skus.find((s) => s.sku === sku);

    return (
      <li
        key={id}
        className="list-group-item d-flex justify-content-between lh-sm"
      >
        <div>
          <h6 className="my-0">
            {name}
            {"   "}
            <strong> ${price}</strong>
          </h6>
          <small className="text-muted">
            {description.split(".")[0] + "."}
          </small>
        </div>
        <div>
          <p className="m-2">Size: {size}</p>
        </div>
        <div>
          <label htmlFor="quantity" className="fw-bold mt-2">
            Select a quantity:
          </label>{" "}
          <select
            id="quantity"
            value={quantity}
            onChange={(e) => updateQuantity(sku, parseInt(e.target.value))}
          >
            <option value="0">Remove</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
        </div>
      </li>
    );
  };

  if (loading) return <Spinner />;
  if (error) throw error;

  const numItemsInCart = useMemo(
    () => cart.reduce((total, curItem) => total + curItem.quantity, 0),
    [cart]
  );

  return (
    <div className="container">
      <main>
        <div className="py-5 text-center">
          <h2>Checkout</h2>
          <p className="lead">
            Below is an example checkout form built entirely with Bootstrap’s
            form controls. The order you place is will not be processed as a
            real order. Please do not use any real data. The web designer of
            this website will not be liable for any damages that may occur as a
            result of using real data.
          </p>
        </div>
        <div className="row g-6">
          <div className="col-md-8 col-lg-8 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary">Your cart</span>
              <span className="badge bg-primary rounded-pill">
                {numItemsInCart}
              </span>
            </h4>
            <ul className="list-group mb-3">
              {cart.map(renderItem)}
              <li className="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>
                  $
                  {cart.length > 0
                    ? products.reduce(
                        (total, curProd) => total + parseInt(curProd.price),
                        0
                      )
                    : "0"}
                </strong>
              </li>
            </ul>
          </div>
          <div className="col-md-4 col-lg-4">
            <h4 className="mb-3">Billing address</h4>
            <form className="needs-validation" noValidate="">
              <div className="row g-3">
                <div className="col-sm-6">
                  <label htmlFor="firstName" className="form-label">
                    First name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder=""
                    defaultValue=""
                    required=""
                  />
                  <div className="invalid-feedback">
                    Valid first name is required.
                  </div>
                </div>
                <div className="col-sm-6">
                  <label htmlFor="lastName" className="form-label">
                    Last name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder=""
                    defaultValue=""
                    required=""
                  />
                  <div className="invalid-feedback">
                    Valid last name is required.
                  </div>
                </div>
                <div className="col-12">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <div className="input-group has-validation">
                    <span className="input-group-text">@</span>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="Username"
                      required=""
                    />
                    <div className="invalid-feedback">
                      Your username is required.
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <label htmlFor="email" className="form-label">
                    Email <span className="text-muted">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="you@example.com"
                  />
                  <div className="invalid-feedback">
                    Please enter a valid email address for shipping updates.
                  </div>
                </div>
                <div className="col-12">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="1234 Main St"
                    required=""
                  />
                  <div className="invalid-feedback">
                    Please enter your shipping address.
                  </div>
                </div>
                <div className="col-12">
                  <label htmlFor="address2" className="form-label">
                    Address 2 <span className="text-muted">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address2"
                    placeholder="Apartment or suite"
                  />
                </div>
                <div className="col-md-5">
                  <label htmlFor="country" className="form-label">
                    Country
                  </label>
                  <select className="form-select" id="country" required="">
                    <option value="">Choose...</option>
                    <option>United States</option>
                  </select>
                  <div className="invalid-feedback">
                    Please select a valid country.
                  </div>
                </div>
                <div className="col-md-4">
                  <label htmlFor="state" className="form-label">
                    State
                  </label>
                  <select className="form-select" id="state" required="">
                    <option value="">Choose...</option>
                    <option>California</option>
                  </select>
                  <div className="invalid-feedback">
                    Please provide a valid state.
                  </div>
                </div>
                <div className="col-md-3">
                  <label htmlFor="zip" className="form-label">
                    Zip
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="zip"
                    placeholder=""
                    required=""
                  />
                  <div className="invalid-feedback">Zip code required.</div>
                </div>
              </div>
              <hr className="my-4" />
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="same-address"
                />
                <label className="form-check-label" htmlFor="same-address">
                  Shipping address is the same as my billing address
                </label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="save-info"
                />
                <label className="form-check-label" htmlFor="save-info">
                  Save this information for next time
                </label>
              </div>
              <hr className="my-4" />
              <h4 className="mb-3">Payment</h4>
              <div className="my-3">
                <div className="form-check">
                  <input
                    id="credit"
                    name="paymentMethod"
                    type="radio"
                    className="form-check-input"
                    defaultChecked=""
                    required=""
                  />
                  <label className="form-check-label" htmlFor="credit">
                    Credit card
                  </label>
                </div>
                <div className="form-check">
                  <input
                    id="debit"
                    name="paymentMethod"
                    type="radio"
                    className="form-check-input"
                    required=""
                  />
                  <label className="form-check-label" htmlFor="debit">
                    Debit card
                  </label>
                </div>
                <div className="form-check">
                  <input
                    id="paypal"
                    name="paymentMethod"
                    type="radio"
                    className="form-check-input"
                    required=""
                  />
                  <label className="form-check-label" htmlFor="paypal">
                    PayPal
                  </label>
                </div>
              </div>
              <div className="row gy-3">
                <div className="col-md-6">
                  <label htmlFor="cc-name" className="form-label">
                    Name on card
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-name"
                    placeholder=""
                    required=""
                  />
                  <small className="text-muted">
                    Full name as displayed on card
                  </small>
                  <div className="invalid-feedback">
                    Name on card is required
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="cc-number" className="form-label">
                    Credit card number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-number"
                    placeholder=""
                    required=""
                  />
                  <div className="invalid-feedback">
                    Credit card number is required
                  </div>
                </div>
                <div className="col-md-3">
                  <label htmlFor="cc-expiration" className="form-label">
                    Expiration
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-expiration"
                    placeholder=""
                    required=""
                  />
                  <div className="invalid-feedback">
                    Expiration date required
                  </div>
                </div>
                <div className="col-md-3">
                  <label htmlFor="cc-cvv" className="form-label">
                    CVV
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-cvv"
                    placeholder=""
                    required=""
                  />
                  <div className="invalid-feedback">Security code required</div>
                </div>
              </div>
              <hr className="my-4" />
              <button className="w-100 btn btn-primary btn-lg" type="submit">
                Continue to checkout
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Checkout;
