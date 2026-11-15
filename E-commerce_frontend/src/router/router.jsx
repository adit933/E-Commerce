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
import AdminLayout from "../admin/AdminLayout";
import AdminDashboard from "../admin/pages/AdminDashboard";
import AdminLogin from "../admin/pages/AdminLoginPage";
import AdminProtectedRoute from "../admin/pages/AdminProtectedRoute";
import ProductManagement from "../admin/pages/ProductManagment";
import CreateProduct from "../admin/pages/CreateProduct";
import UpdateProduct from "../admin/pages/UpdateProduct";
import CategoryManagment from "../admin/pages/CategoryManagment";
import UpdateCategory from "../admin/pages/UpdateCategory";
import CreateCategory from "../admin/pages/CreateCategory";
import AdminProcessing from "../admin/pages/AdminProcessing";
import AdminShipped from "../admin/pages/AdminShipped";

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

           <Route element={<AdminProtectedRoute/>}>
             <Route path = "/admin" element={<AdminLayout/>}>
                <Route path="" element={<AdminDashboard/>}/>
                <Route path="product-managment" element={<ProductManagement/>}/>
                <Route path="create-product" element={<CreateProduct/>}/>
                <Route path="update-product/:productId" element={<UpdateProduct/>}/>
                <Route path="category-managment" element={<CategoryManagment/>}/>
                <Route path="update-category/:categoryId" element={<UpdateCategory/>}/>
                <Route path="create-category" element={<CreateCategory/>}/>
                <Route path="order-managment" element={<AdminProcessing/>}/>
                <Route path="shipped-order" element={<AdminShipped/>}/>
            </Route>
           </Route>

            <Route path="/admin/login" element = {<AdminLogin/>}></Route>


        </>
    )
)

export default router