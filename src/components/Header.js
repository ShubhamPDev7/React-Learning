import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Login");
  const onlineStatus = useOnlineStatus();

  return (
    <header className="flex justify-between items-center px-6 py-2 border-b border-gray-200 bg-white shadow-sm">
      <div>
        <img className="w-16" src={LOGO_URL} alt="Logo" />
      </div>

      <nav>
        <ul className="flex items-center gap-6 text-sm text-gray-700">
          <li className="text-xs">Status: {onlineStatus ? "🟢" : "🔴"}</li>
          <li className="hover:text-black">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-black">
            <Link to="/about">About Us</Link>
          </li>
          <li className="hover:text-black">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="hover:text-black">
            <Link to="/grocery">Grocery</Link>
          </li>
          <li className="hover:text-black cursor-pointer">Cart</li>
          <li>
            <button
              className="px-3 py-1 bg-gray-100 border border-gray-300 rounded text-xs font-semibold hover:bg-gray-200"
              onClick={() => {
                setBtnNameReact(btnNameReact === "Login" ? "Logout" : "Login");
              }}
            >
              {btnNameReact}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export { Header };
export default Header;
