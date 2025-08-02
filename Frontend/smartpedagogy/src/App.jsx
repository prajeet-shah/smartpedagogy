import Header from "./components/Header";
import Home from "./components/Home";
import "./index.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useNavigate,
  useLocation,
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
import Assignment from "./pages/teachers/Assignment";
import Classroom_Overview from "./pages/teachers/Classroom_Overview";
import Performance_Dashboard from "./pages/teachers/Performance_Dashboard";
import Assignment_Overview from "./pages/students/Assignment_Overview";
import Dashboard_Overview from "./pages/students/Dashboard_Overview";
import Feedback_And_Score from "./pages/students/Feedback_And_Score";
import Edit_Assignment from "./pages/teachers/Edit_Assignment";
import AssignmentDetails from "./pages/teachers/components/AssignmentDetails";
import ViewSubmission from "./pages/teachers/components/ViewSubmission";
import ForgetPassword from "./components/ForgetPassword";

function App() {
  const AppLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
      getProfile();
    }, []);

    const getProfile = async () => {
      try {
        let res = await axios.get(BASE_URL + "/profile", {
          withCredentials: true,
        });

        dispatch(addUser(res?.data?.user));
        navigate(location.pathname, { replace: true });
      } catch (err) {
        navigate("/login");
        console.error("ERROR: ", err.message);
      }
    };

    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
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
            <Route path="/assignments" element={<Assignment />} />
            <Route
              path="/classroom-overview"
              element={<Classroom_Overview />}
            />
            <Route
              path="/performance-dashboard"
              element={<Performance_Dashboard />}
            />
            <Route
              path="/assignments-overview"
              element={<Assignment_Overview />}
            />
            <Route
              path="/dashboard-overview"
              element={<Dashboard_Overview />}
            />
            <Route
              path="/feedback-and-score"
              element={<Feedback_And_Score />}
            />
            <Route path="/edit-assignment/:id" element={<Edit_Assignment />} />
            <Route
              path="/assignment-details/:id"
              element={<AssignmentDetails />}
            />
            <Route path="/view-submission" element={<ViewSubmission />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
