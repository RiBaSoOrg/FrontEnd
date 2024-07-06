import "./app.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Shop} from "./pages/shop/Shop";
import {Navbar} from "./components/Navbar";
import {Cart} from "./pages/cart/Cart";
import {ShopContextProvider} from "./context/ShopContext";

function App() {
  return (
      <div className="App">
          <div className="App">
              <ShopContextProvider>
                  <Router>
                      <Navbar/>
                      <Routes>
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