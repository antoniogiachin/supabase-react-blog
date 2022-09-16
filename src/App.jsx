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
import authSlice, {
  SET_USERS_INFOS,
  SET_AUTHOR_STATUS,
  SET_LOGGED_STATUS,
} from "./store/slicers/authSlice";
// * COMPONENTS
import { TheModal } from "./components/UI/TheModal";

function App() {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.modal.show);
  const modalId = useSelector((state) => state.modal.id);

  const { isPending, errors, handleLogout } = useAuth();

  useEffect(() => {
    const authStorage = localStorage.getItem("auth");
    if (authStorage) {
      dispatch(SET_USERS_INFOS(JSON.parse(localStorage.getItem("auth"))));
      dispatch(SET_LOGGED_STATUS(true));
      if (JSON.parse(localStorage.getItem("auth")).isAuthor) {
        dispatch(SET_AUTHOR_STATUS(true));
      }
    }
  }, []);

  return (
    <div className="App bg-gradient-to-r from-purple-800 to-slate-600">
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
