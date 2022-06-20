import Navigation from "./Components/Navigation/Navigation";
import Home from "./Components/Home/Home";
import Footer from "./Components/Footer/Footer";
import Details from "./Components/Details.jsx/Details";
import Checkout from "./Components/Checkout/Checkout";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navigation />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="details" element={<Details />} />
          <Route path="checkout" element={<Checkout />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
