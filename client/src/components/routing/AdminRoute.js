import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import { currentUserLogined } from "../../redux/selectors";

const AdminRoute = ({ children }) => {
  const userLogined = useSelector(currentUserLogined)
  return (
    localStorage.getItem("authToken") && (userLogined?.user?.role === "ADMIN" || localStorage.getItem("userLoginedRole") === "ADMIN")) 
    ? children 
    : <Navigate to="/404" replace />
}

export default AdminRoute;
