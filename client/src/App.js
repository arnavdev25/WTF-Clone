import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Banner from "./Components/Banner";
import Body from "./Components/Body";
import { Route, Routes } from "react-router-dom";
import Card from "./Components/Card";

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
