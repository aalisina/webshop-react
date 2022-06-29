import React, { useState } from "react";
import useFetchAll from "../../Services/useFetchAll";
import Spinner from "../../Components/Spinner/Spinner";
import { saveShippingDetails } from "../../Services/orderService";

const emptyOrder = {
  firstName: "",
  lastName: "",
  address: "",
  country: "",
};
const FORMSTATUS = {
  IDLE: "IDLE",
  SUBMITTED: "SUBMITTED",
  SUBMITTING: "SUBMITTING",
  COMPLETED: "COMPLETED",
};
function Checkout({ cart, updateQuantity, emptyCart }) {
  const prods = cart.map((i) => i.id);
  const { data: products, loading, error } = useFetchAll(prods);
  const [order, setOrder] = useState(emptyOrder);
  const [formStatus, setFormStatus] = useState(FORMSTATUS.IDLE);

  // state to handle errors for the saveShippingDetails API call
  const [saveError, setSaveError] = useState(null);

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
  const handleChange = (e) => {
    // persist the event, otherwise it will be garbage collected
    // In react 17 or newer not needed anymore
    // e.persist();
    setOrder((curOrder) => {
      return {
        ...curOrder,
        [e.target.id]: e.target.value,
      };
    });
  };

  const handleBlur = (e) => {
    // TODO: handle blur
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus(FORMSTATUS.SUBMITTING);
    try {
      const response = await saveShippingDetails(order);
      console.log(response);
      emptyCart();
      setFormStatus(FORMSTATUS.COMPLETED);
    } catch (e) {
      setSaveError(e);
    }
  };

  if (loading) return <Spinner />;
  if (error) throw error;
  if (saveError) throw saveError;

  const numItemsInCart = cart.reduce(
    (total, curItem) => total + curItem.quantity,
    0
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
            <form
              className="needs-validation"
              noValidate=""
              onSubmit={handleSubmit}
            >
              <div className="row g-3">
                <div className="col-sm-6">
                  <label htmlFor="firstName" className="form-label">
                    First name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    value={order.firstName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </div>
                <div className="invalid-feedback">
                  Please enter your first name.
                </div>
                <div className="col-sm-6">
                  <label htmlFor="lastName" className="form-label">
                    Last name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    value={order.lastName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </div>
                <div className="invalid-feedback">
                  Please enter your last name.
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
                    value={order.address}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">
                    Please enter your shipping address.
                  </div>
                </div>

                <div className="col-md-5">
                  <label htmlFor="country" className="form-label">
                    Country
                  </label>
                  <select
                    className="form-select"
                    id="country"
                    value={order.country}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  >
                    <option value="">Choose country</option>
                    <option value="United States">United States</option>
                    <option value="Colombia">Colombia</option>
                    <option value="Mexico">Mexico</option>
                  </select>
                  <div className="invalid-feedback">
                    Please select a valid country.
                  </div>
                </div>
              </div>

              <hr className="my-4" />
              <button
                className="w-100 btn btn-primary btn-lg"
                type="submit"
                disabled={formStatus === FORMSTATUS.SUBMITTING}
              >
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
