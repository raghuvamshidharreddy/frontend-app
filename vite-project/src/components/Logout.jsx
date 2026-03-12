import { useEffect, useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";

function Logout() {
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    setUser({});
    navigate("/login");
  }, []);

  return <h2>Logging out...</h2>;
}

export default Logout;