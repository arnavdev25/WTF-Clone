import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Banner from "./Components/Banner";
import Body from "./Components/Body";
import { Route, Routes } from "react-router-dom";
import Card from "./Components/Card";
import Banner2 from "./assets/banner2.PNG";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Banner />
              <Body />
              <div>
                <img src={Banner2} alt="Banner" style={{ width: "100%" }} />
              </div>
            </>
          }
        />
        <Route path="/:user_id" element={<Card />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
