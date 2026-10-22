import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Home from "../pages/Home";
import Product from "../pages/Product";
import Layout from "../Layout";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Cart from "../pages/Cart";

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

            </Route>
        </>
    )
)

export default router