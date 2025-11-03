import axios from "axios";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Header = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div>
      <div className="navbar bg-gradient-to-r from-indigo-600 to-indigo-800 text-white shadow-sm px-8">
        {/* Logo */}
        <div className="flex items-center gap-6">
          <Link to={user ? "/" : "/login"} className="btn btn-ghost text-xl font-semibold">
            SmartPedagogy
          </Link>

          {/* Navigation Links (with improved spacing) */}
          {user && (
            <nav className="flex gap-8 text-lg font-medium">
              {user.role === "Student" && (
                <>
                  <Link to="/">Home</Link>
                  <Link to="/assignments-overview">Assignment Overview</Link>
                  <Link to="/dashboard-overview">Dashboard Overview</Link>
                  <Link to="/feedback-and-score">Feedback & Score</Link>
                </>
              )}

              {user.role === "Teacher" && (
                <>
                  <Link to="/">Home</Link>
                  <Link to="/assignments">Assignment Overview</Link>
                  <Link to="/classroom-overview">Classroom Overview</Link>
                  <Link to="/performance-dashboard">Performance Dashboard</Link>
                </>
              )}
            </nav>
          )}
        </div>

        {/* Right Side - User Info */}
        {user && (
          <div className="flex items-center gap-6 ml-auto">
            <p className="text-lg font-semibold">Welcome, {user?.name}</p>
            <div className="dropdown dropdown-end text-black font-semibold text-xl">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="User avatar"
                    src={
                      user.profilePic ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                  />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <Link to="/change-password">
                  <li>
                    <p>Change Password</p>
                  </li>
                </Link>
                <li onClick={handleLogout}>
                  <Link to="/login">Logout</Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
