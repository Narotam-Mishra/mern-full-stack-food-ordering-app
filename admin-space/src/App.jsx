import Navbar from "./components/navbar/Navbar"
import Sidebar from "./components/sidebar/Sidebar"
import { Route, Routes } from 'react-router-dom'
import Add from "./pages/add/Add"
import List from "./pages/list/List"
import Orders from "./pages/orders/Orders"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const apiUrl = 'https://backend-mern-full-stack-food-ordering-app.onrender.com';

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add url={apiUrl} />} />
          <Route path="/list" element={<List url={apiUrl} />} />
          <Route path="/orders" element={<Orders url={apiUrl} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App