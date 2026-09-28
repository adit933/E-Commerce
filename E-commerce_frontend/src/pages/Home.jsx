import React , {useState , useEffect} from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import FeaturedProduct from "../components/FeaturedProductCard";
import Category from "../components/Category";

function Home() {


    const [products , setProducts] = useState([])

    useEffect (() => {

        fetchProducts()
    } , [])

    const fetchProducts = async () => {

        const response = await fetch('http://localhost:8000/api/v1/product/products')

        const data = await response.json()

        const allproducts = data.data

        const featuredProducts = allproducts.filter((product) => {
            return product.isFeatured === true
        })

        setProducts(featuredProducts)
    }

    const categories = [
        {
            id: 1,
            name: "Sneakers",
            image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg"
        },
        {
            id: 2,
            name: "Clothing",
            image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg"
        },
        {
            id: 3,
            name: "Bags",
            image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg"
        },
        {
            id: 4,
            name: "Watches",
            image: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg"
        },

        {
            id: 5,
            name: "Accessories",
            image: "https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg"
        },
        {
            id: 5,
            name: "Accessories",
            image: "https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg"
        },
        {
            id: 5,
            name: "Accessories",
            image: "https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg"
        },
        {
            id: 5,
            name: "Accessories",
            image: "https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg"
        }
    ];

    const [category , setCategory] = useState([])

    useEffect(() => {

        fetchCategories()

    } , [])


    const fetchCategories = async () => {
        const response = await fetch('http://localhost:8000/api/v1/category/category')

        const data = await response.json()

        // console.log(data);

        const allCategories = data.data

        const activeCategories = allCategories.filter((category) => {
            return category.isActive === true
        })

        setCategory(activeCategories)
    }

    return (
        <>

            <Hero />

            <FeaturedProduct product={products} />
            <Category categories={category} />

            <Footer />

        </>
    )
}

export default Home