import Navigation from "./Components/Navigation/Navigation";
import Home from "./Components/Home/Home";
import Footer from "./Components/Footer/Footer";
import Details from "./Components/Details.jsx/Details";
import Checkout from "./Components/Checkout/Checkout";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Home />
      <Details />
      <Checkout />
      <Footer />
    </div>
  );
}

export default App;
