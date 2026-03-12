import "./Header.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../App";

function Header() {
  const { user } = useContext(AppContext);

  return (
    <div className="App-Header">
      <h1>My Store</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
        <li>
          <Link to="/orders">Order</Link>
        </li>
        {!user?.email ? (
          <li>
            <Link to="/login">Login</Link>
          </li>
        ) : (
          <>
            <li>
              <span>{user.email}</span>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Header;