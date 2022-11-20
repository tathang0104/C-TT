import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Notfound from "./components/Notfound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dasboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import Register from "./pages/Register";
import Reservation from "./pages/Reservation";
import ResetPassword from "./pages/ResetPassword";
import Service from "./pages/Service";
import TeamMember from "./pages/TeamMember";
import Testimonial from "./pages/Testimonial";
import PrivateRoute from "./components/routing/PrivateRoute";
import { Layout } from "./layouts/Layout";
import { ManageLayout } from "./layouts/ManageLayout";
import User from "./pages/User";
import Product from "./pages/Product";
import Order from "./pages/Order";
import EditUser from "./components/EditUser";
import EditProduct from "./components/EditProduct";
import ViewOrder from "./components/ViewOrder";
import CreateProduct from "./components/CreateProduct";
import { Profile } from "./components/Profile";
import { CreateUser } from "./components/CreateUser";
import AdminRoute from "./components/routing/AdminRoute";
import EditOrder from "./components/EditOrder";
import { SelfOrder } from "./components/SelfOrder";
import { Feedback } from "./components/Feedback";
import { CheckOut } from "./pages/CheckOut";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route exact index element={
          <Home>
            <Service />
            <About />
            <Menu />
            <Reservation />
            <TeamMember />
            <Testimonial />
          </Home> 
        }/>
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="service" element={<Service />} />
        <Route path="menu" element={<Menu />} />
        <Route path="reservation" element={<Reservation />} />
        <Route path="team" element={<TeamMember />} />
        <Route path="testimonial" element={<Testimonial />} />
      </Route>

      <Route path="/dashboard" element={
        <PrivateRoute>
          <ManageLayout />
        </PrivateRoute>
      }>
        <Route exact index element={
          <AdminRoute>
            <Dasboard />
          </AdminRoute>
        }/>
        <Route path="profile" element={<Profile />} />
        <Route path="selfOrder" element={<SelfOrder />} />
        <Route path="selfOrder/feedback/:id" element={<Feedback />} />
        <Route path="checkOut/:id" element={<CheckOut />} />
        
        <Route path='user' element={
          <PrivateRoute>
            <Outlet />
          </PrivateRoute>
        }>
          <Route exact index element= {
            <AdminRoute>
              <User />
            </AdminRoute>
          }/>
          <Route path='create' element={
            <AdminRoute>
              <CreateUser />
            </AdminRoute>
          }/>
          <Route path='update/:id' element={<EditUser />} />
        </Route>
        <Route path='product' element={
          <AdminRoute> 
            <Outlet />
          </AdminRoute>
        }>
          <Route exact index element={<Product />}/>
          <Route path='create' element={<CreateProduct />} />
          <Route path='update/:id' element={<EditProduct />} />
        </Route>
        <Route path='order' element={
          <AdminRoute> 
            <Outlet />
          </AdminRoute>
        }>
          <Route exact index element={<Order />}/>
          <Route path='view/:id' element={<ViewOrder />} />
          <Route path='update/:id' element={<EditOrder />} />
        </Route>
      </Route>
      
      {/* authorization */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/passwordreset/:resetToken" element={<ResetPassword />} />
      <Route path="/404" element={<Notfound />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
};
