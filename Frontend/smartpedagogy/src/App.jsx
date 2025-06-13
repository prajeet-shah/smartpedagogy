import Header from "./components/Header";
import Home from "./components/Home";
import "./index.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import Signup from "./components/Signup";
import Footer from "./components/Footer";
import Login from "./components/Login";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

function App() {
  const AppLayout = () => {
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
