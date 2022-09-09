import "./App.css";
// * ROUTER
import { Routes, Route } from "react-router-dom";
// * custom components
import { TheHeader } from "./components/UI/TheHeader";
// * PAGES
import { Home } from "./pages/Home";
import { Auth } from "./pages/Auth";

function App() {
  return (
    <div className="App bg-teal-300">
      <TheHeader />
      <div className="content-wrapper">
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/auth"} element={<Auth />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
