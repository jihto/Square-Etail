import Home from "./pages/customer/Home" 
import Navbar from "./components/navbar/Navbar"
import { Navigate, Route, Routes, useLocation } from "react-router-dom" 
import Shopping from "./pages/customer/Shopping"
import ProductDetailsModal from "./components/modals/ProductDetails/ProductDetailsModal" 
import AuthenticationModal from "./components/modals/Authentication/AuthenticationModal"
import Empty from "./components/Empty"
import AdminHome from "./pages/admin/AdminHome"
import NavbarAdmin from "./components/navbar/NavbarAdmin"
import Login from "./pages/admin/Login"
import AdminProducts from "./pages/admin/AdminProducts"
import AdminTrash from "./pages/admin/AdminTrash"
import { Toaster } from "react-hot-toast"
import Account from "./pages/customer/Account"
import OrderDetailsModal from "./components/modals/OrderDetailsModal"
import { useSelector } from "react-redux"
import { RootState } from "./redux/store"
import ChangeProductModal from "./components/modals/ChangeProductsModal"
import ImageModal from "./components/modals/ImageModal"
import Contact from "./pages/customer/Contact"
import ConfirmModal from "./components/modals/ConfirmModal"
import FilterModal from "./components/modals/FilterModal" 
import OrderCheckingModal from "./components/modals/Order/OrderCheckingModal"
import OrderFormModal from "./components/modals/Order/OrderFormModal" 
import StatisticModal from "./components/modals/StatisticModal"
 

function LayoutAdmin() {
  const { admin } = useSelector((state: RootState) => state.admin);
  const location = useLocation();

  return admin ? (
    <NavbarAdmin />
  ) : (
    <Navigate to='/auth' state={{ from: location }} replace />
  );
} 
function App() {  
  return (
    <> 
      <Routes> 
        <Route path="/" element={<Navbar/>} > 
          <Route path="home" index element={<Home/>} />
          <Route path="shopping" element={<Shopping/>} /> 
          <Route path="account" element={<Account/>} />  
          <Route path="contact" element={<Contact/>} />  
        </Route>      
        <Route path="/admin" element={<LayoutAdmin/>}> 
          <Route path="home" index element={<AdminHome/>} /> 
          <Route path="products" index element={<AdminProducts/>} /> 
          <Route path="deleted" index element={<AdminTrash/>} /> 
          <Route path="account" index element={<AdminHome/>} /> 
        </Route>
        <Route path="auth" index element={<Login/>} />
        <Route path="*" element={<Empty isButton={true}/>} />
      </Routes> 
      <ProductDetailsModal/>
      <OrderCheckingModal/>
      <OrderFormModal/> 
      <AuthenticationModal/> 
      <OrderDetailsModal/>
      <ChangeProductModal/> 
      <ConfirmModal/>
      <ImageModal />
      <FilterModal/> 
      <StatisticModal/>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </>
  )
}

export default App
