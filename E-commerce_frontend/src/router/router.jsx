import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Home from "../pages/Home";
import Product from "../pages/Product";
import Layout from "../Layout";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Cart from "../pages/Cart";
import EditProfile from "../pages/EditProfile";
import About from "../pages/About";
import Shop from "../pages/Shop";
import Category from "../pages/Category";
import Billing from "../pages/Billing";
import MyOrders from "../pages/MyOrders";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Layout/>}>

                <Route path="" element={<Home/>}/>
                <Route path="products/:id" element = {<Product/>}/>
                <Route path="register" element = {<Register/>}/>
                <Route path="login" element = {<Login/>}/>
                <Route path="profile" element = {<Profile/>}/>
                <Route path="cart" element = {<Cart/>}/>
                <Route path="edit-profile" element = {<EditProfile/>}/>
                <Route path="about" element = {<About/>}/>
                <Route path = "shop" element = {<Shop/>}/>
                <Route path = "categories" element = {<Category/>}/>
                <Route path="checkout" element={<Billing/>}/>
                <Route path="my-orders" element={<MyOrders/>}/>

            </Route>
        </>
    )
)

export default router