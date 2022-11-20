import { useState, useEffect } from "react";
import { getDashboard } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { currentUserLogined, dashboardState } from "../redux/selectors";
import BarChart from "../components/BarChart";

const Dasboard = () => {
  const [data, setData] = useState(null);
  const [dataRevenue, setDataRevenue] = useState(null);
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


  useEffect(() => {
    setData({
      labels: dashboardData?.userPerMonth?.map((data) => data.lable),
      datasets: [
        {
          label: "Users Gained",
          data: dashboardData?.userPerMonth?.map((data) => data.Count),
          backgroundColor: "#ff80ed",
          borderColor: "#0F172B",
          borderWidth: 1,
        },
        {
          label: "Orders Gained",
          data: dashboardData?.orderPerMonth?.map((data) => data.Count),
          backgroundColor: "#C7372F",
          borderColor: "#0F172B",
          borderWidth: 1,
        }
      ],
    })

    setDataRevenue({
      labels: dashboardData?.revenuePerMonth?.map((data) => data.lable),
      datasets: [
        {
          label: "Reveneu Gained (unit : dollars)",
          data: dashboardData?.revenuePerMonth?.map((data) => data.Sum),
          backgroundColor: "#FEA116",
          borderColor: "#0F172B",
          borderWidth: 1,
        },
      ],
    })
  }, [dashboardData]);

  return (
    <>
      {<h1 className="text-primary">Hello {userLogined?.user.role} {userLogined?.user.username} !</h1>}
      <div className="row">
        <div className="col-md-6">
          <div className="mt-3">
            {dataRevenue && <BarChart chartData={dataRevenue} />}
          </div>
          <h5 className=" mt-3 text-center" style={{fontWeight: 600, fontStyle: "italic"}}>Chart 1. Reveneu per month</h5>
        </div>
        <div className="col-md-6">
          <div className="mt-3">
            {data && <BarChart chartData={data} />}
          </div>
          <h5 className=" mt-3 text-center" style={{fontWeight: 600, fontStyle: "italic"}}>Chart 2. User and Order gained per month</h5>
        </div>
      </div>
    </>
  )
}

export default Dasboard;
