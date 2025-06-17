import Header from "./components/Header";
import Home from "./components/Home";
import "./index.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useNavigate,
} from "react-router";
import Signup from "./components/Signup";
import Footer from "./components/Footer";
import Login from "./components/Login";
import { Provider, useDispatch } from "react-redux";
import appStore from "./utils/appStore";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { addUser } from "./utils/userSlice";

function App() {
  const AppLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
      getProfile();
    }, []);

    const getProfile = async () => {
      try {
        let res = await axios.get(BASE_URL + "/profile", {
          withCredentials: true,
        });

        dispatch(addUser(res?.data?.user));
        navigate("/");
      } catch (err) {
        navigate("/login");
        console.error("ERROR: ", err.message);
      }
    };

    return (
      <div>
        <Header />
        <Outlet />
        <Footer />
      </div>
    );
  };

  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
