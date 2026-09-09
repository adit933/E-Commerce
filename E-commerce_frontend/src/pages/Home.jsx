import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import FeaturedProduct from "../components/FeaturedProductCard";
import Category from "../components/Category";

function Home() {
    const products = [
        {
            id: 1,
            name: "Sneakers",
            price: 2499,
            image: "https://images.pexels.com/photos/23692992/pexels-photo-23692992.jpeg"
        },
        {
            id: 2,
            name: "Watch",
            price: 3999,
            image: "https://images.pexels.com/photos/23692992/pexels-photo-23692992.jpeg"
        },
        {
            id: 3,
            name: "Headphones",
            price: 1999,
            image: "https://images.pexels.com/photos/23692992/pexels-photo-23692992.jpeg"
        },
    ]

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

    return (
        <>

            <Hero />

            <FeaturedProduct product={products} />
            <Category categories={categories} />

            <Footer />

        </>
    )
}

export default Home