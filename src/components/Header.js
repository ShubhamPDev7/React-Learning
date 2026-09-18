import { LOGO_URL } from "../utils/constants";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Login");
  const onlineStatus = useOnlineStatus();

  const data = useContext(UserContext);
  // console.log(data);

  const [user, setUser] = useState("Default User");

  // subscribing to the store using a Selector
  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);

  return (
    <header className="flex justify-between items-center px-6 py-2 border-b border-gray-200 bg-white shadow-sm">
      <div>
        <img className="w-16" src={LOGO_URL} alt="Logo" />
      </div>

      <nav>
        <ul className="flex items-center gap-6 text-sm text-gray-700">
          <li className="text-xs">Status: {onlineStatus ? "🟢" : "🔴"}</li>
          <li className="hover:text-black active:scale-95">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-black active:scale-95">
            <Link to="/about">About Us</Link>
          </li>
          <li className="hover:text-black active:scale-95">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="hover:text-black active:scale-95">
            <Link to="/grocery">Grocery</Link>
          </li>
          <li className="hover:text-black cursor-pointer active:scale-95 font-bold">
            <Link to="/cart">Cart ({cartItems.length} items)</Link>
          </li>
          <li>
            <button
              className="px-3 py-1 bg-gray-100 border border-gray-300 rounded text-xs font-semibold hover:bg-gray-200 active:scale-95"
              onClick={() => {
                setBtnNameReact(btnNameReact === "Login" ? "Logout" : "Login");
              }}
            >
              {btnNameReact}
            </button>
          </li>
          <li className="px-4 font-bold cursor-pointer active:scale-95">
            {data.loggedInUser}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export { Header };
export default Header;
