import React from "react";
import { Route, Routes } from "react-router-dom";
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
        <Route exact index element={<Dasboard />}/>
        <Route path="profile" element={<Profile />} />
        
        <Route path='user'>
          {
            
          }
          <Route exact index element={<User />}/>
          <Route path='create' element={<CreateUser />} />
          <Route path='update/:id' element={<EditUser />} />
        </Route>
        <Route path='product'>
          <Route exact index element={<Product />}/>
          <Route path='create' element={<CreateProduct />} />
          <Route path='update/:id' element={<EditProduct />} />
        </Route>
        <Route path='order'>
          <Route exact index element={<Order />}/>
          <Route path='view/:id' element={<ViewOrder />} />
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
