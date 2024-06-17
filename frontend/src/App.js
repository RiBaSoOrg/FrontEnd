import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Shop} from "./pages/shop/Shop";
import {Navbar} from "./components/navbar";

function App() {
  return (
      <div className="App">
          <Router>
              <Navbar />
            <Routes>
              <Route path="/" element={<Shop />} />
            </Routes>
          </Router>
      </div>
  );
}

export default App;