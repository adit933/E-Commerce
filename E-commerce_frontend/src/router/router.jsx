import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Home from "../pages/Home";
import Product from "../pages/Product";
import Layout from "../Layout";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Layout/>}>

                <Route path="" element={<Home/>}/>
                <Route path="product" element = {<Product/>}/>

            </Route>
        </>
    )
)

export default router