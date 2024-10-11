import { useContext, useEffect, useState } from "react"
import "./MyOrders.css"
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const MyOrders = () => {
  const {backendUrl, token} = useContext(StoreContext);
  cont[data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.post(backendUrl+"/api/order/userorders", {}, {headers: {token}});
    setData(response.data.data);
    console.log("My Order data:",response.data.data);
  }

  // since we wanted to run fetch orders on rendering of the component
  useEffect(() => {
    if(token){
      fetchOrders();
    }
  }, [token])

  return (
    <div>MyOrders</div>
  )
}

export default MyOrders