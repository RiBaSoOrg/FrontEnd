import "./app.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Shop} from "./pages/shop/Shop";
import {Navbar} from "./components/Navbar";
import {Cart} from "./pages/cart/Cart";
import {ShopContextProvider} from "./context/ShopContext";
import Login from "./pages/login/Login";
import Checkout from "./pages/checkout/Checkout";

function App() {
  return (
      <div className="App">
          <div className="App">
              <ShopContextProvider>
                  <Router>
                      <Navbar/>
                      <Routes>
                          <Route path="/login" element={<Login />} />
                          <Route path="/" element={<Shop/>}/>
                          <Route path="/cart" element={<Cart/>}/>
                      </Routes>
                  </Router>
              </ShopContextProvider>
          </div>
      </div>
  );
}

export default App;