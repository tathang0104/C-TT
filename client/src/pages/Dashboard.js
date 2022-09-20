import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from 'react-redux';
// import { login, getProfile } from '../redux/actions';
import { currentUserLogined } from "../redux/selectors";

const Dasboard = () => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const [dataUser, setDataUser] = useState(null);
  const userLogined = useSelector(currentUserLogined);
  console.log(userLogined?.user)
  console.log(userLogined?.user.username)
  useEffect(() => {
    setDataUser(userLogined?.user)
  },[userLogined])

  useEffect(() => {
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("/api/private", config);
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    fetchPrivateDate();
  }, []);
  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <>
      { dataUser && <h1 className="text-primary">Hello {userLogined?.user.username} your email {userLogined?.user.email}</h1>}
      <div>{privateData}</div>
    </>
  )
}

export default Dasboard;
