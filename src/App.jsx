import "./App.css";
// * ROUTER
import { Routes, Route } from "react-router-dom";
// * custom components
import { TheHeader } from "./components/UI/TheHeader";
// * curom hooks
import { useAuth } from "./hooks/useAuth";
// * PAGES
import { Home } from "./pages/Home";
import { Auth } from "./pages/Auth";
import { Dashboard } from "./pages/Dashboard";
// * REDUX
import { useDispatch, useSelector } from "react-redux";
// * REACT IMPORTS
import { useEffect } from "react";
import { SET_USERS_INFOS, SET_LOGGED_STATUS } from "./store/slicers/authSlice";
// * COMPONENTS
import { TheModal } from "./components/UI/TheModal";

function App() {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.modal.show);
  const modalId = useSelector((state) => state.modal.id);

  const { isPending, errors, handleLogout } = useAuth();

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      dispatch(SET_USERS_INFOS(JSON.parse(localStorage.getItem("auth"))));
      dispatch(SET_LOGGED_STATUS(true));
    }
  }, []);

  return (
    <div className="App bg-teal-300">
      <TheHeader />
      <div className="content-wrapper">
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/auth"} element={<Auth />} />
          <Route path={"/dashboard"} element={<Dashboard />} />
        </Routes>
      </div>
      {/* LOGOUT MODAL  */}
      {showModal && modalId === "logoutModal" && (
        <TheModal
          message="Sei sicuro di voler effetuare il logout?"
          handleFunction={handleLogout}
          errors={errors}
          isPending={isPending}
        />
      )}
    </div>
  );
}

export default App;
