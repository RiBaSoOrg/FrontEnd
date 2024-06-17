import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Shop} from "./pages/shop/shop";

function App() {
  return (
      <div className="App">

          <Router>
            <Routes>
              <Route path="/" element={<Shop />} />
            </Routes>
          </Router>
      </div>
  );
}

export default App;