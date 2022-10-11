import { useState, useEffect } from "react";
import { getDashboard } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { currentUserLogined, dashboardState } from "../redux/selectors";
import BarChart from "../components/BarChart";

const Dasboard = () => {
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch()
  const userLogined = useSelector(currentUserLogined);
  const dashboardData = useSelector(dashboardState);
  const navigate = useNavigate()

  useEffect(() =>{
    if (!localStorage.getItem('authToken')) {
      navigate('/')
    }
  },[navigate])

  useEffect(() => {
    dispatch(getDashboard.getDashboardRequest())
  }, [dispatch]);
  console.log(dashboardData?.userPerMonth)


  useEffect(() => {
    setUserData({
      labels: dashboardData?.userPerMonth?.map((data) => data.lable),
      datasets: [
        {
          label: "Users Gained",
          data: dashboardData?.userPerMonth?.map((data) => data.Count),
          backgroundColor: "#FEA116",
          borderColor: "#0F172B",
          borderWidth: 1,
        },
        {
          label: "Orders Gained",
          data: dashboardData?.orderPerMonth?.map((data) => data.Count),
          backgroundColor: "#C7372F",
          borderColor: "#0F172B",
          borderWidth: 1,
        },
        {
          label: "Products Gained",
          data: dashboardData?.productPerMonth?.map((data) => data.Count),
          backgroundColor: "#00A465",
          borderColor: "#0F172B",
          borderWidth: 1,
        },
      ],
    })
  }, [dashboardData]);
  return (
    <>
      {<h1 className="">Hello {userLogined?.user.username}, {userLogined?.user.email}</h1>}
      <div className="row">
        <div className="col-md-12">
          {userData && <BarChart chartData={userData} />}
        </div>
      </div>
    </>
  )
}

export default Dasboard;
