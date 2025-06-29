import { useNavigate } from "react-router-dom";
import { confirmLogout } from "@/Utils/Helpers/SwalHelpers";

const Logout = ({ className }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    confirmLogout(() => {
      localStorage.removeItem("user");
      navigate("/");
    });
  };

  return (
    <button
      onClick={handleLogout}
      className={`text-lg text-red-400 hover:text-white ${className}`}
    >
      <span className="text-lg">🚪</span>
      <span className="menu-text hidden lg:inline">Logout</span>
    </button>
  );
};

export default Logout;
