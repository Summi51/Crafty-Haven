import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "../../pages/About";
import Contact from "../../pages/Contact";
import CraftBlog from "../../pages/CraftBlog";
import SingleCartMainContent from "../../pages/CraftBlogHome/SingleCartMainContent";
import DrawingBlog from "../../pages/DrawingBlog";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Getdatahome from "../../pages/OtherPages/Getdatahome";
import SingleGetdatahome from "../../pages/OtherPages/SingleGetdatahome";
import Product from "../../pages/Product";
import Signup from "../../pages/Signup";
const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/drawblog" element={<DrawingBlog />} />
        <Route path="/craftblog" element={<CraftBlog />} />
        <Route path="/craftblog/:singleid" element={<SingleCartMainContent />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/gethome/:getid" element={<SingleGetdatahome />} />
        <Route path="/gethome" element={<Getdatahome />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
