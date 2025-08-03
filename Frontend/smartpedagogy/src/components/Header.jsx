import axios from "axios";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Header = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    let res = axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
    console.log(res.data);
    dispatch(removeUser());
  };

  return (
    <div>
      <div className="navbar bg-gradient-to-r from-indigo-600 to-indigo-800 text-white shadow-sm ">
        <div className="flex-1">
          <Link to={user ? "/" : "/login"} className="btn btn-ghost pointer-cursor text-xl">
            smartpedagogy
          </Link>
        </div>
        {user ? (
          <div className="flex gap-2">
            {/* <input
            //   type="text"
            //   placeholder="Search"
            //   className="input input-bordered w-24 md:w-auto"
            // /> */}
            <p className="mx-5 text-xl font-bold my-1">Welcome, {user?.name}</p>
            <div className="dropdown dropdown-end text-black font-semibold text-xl">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                {/* <li>
                 <Link to ={"/profile"} >
                  <p  className="text-black">
                    Profile
                   
                  </p></Link>
                </li>
                <li>
                  <a>Settings</a>
                </li> */}
                <Link to={"/change-password"}>
                  <li>
                    <p>change password</p>
                  </li>
                </Link>
                <li onClick={handleLogout}>
                  <Link to="/login">Logout</Link>
                </li>
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
