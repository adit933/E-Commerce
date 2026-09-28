import React from "react";
import { useParams } from "react-router-dom";
import { useState , useEffect } from "react";

function Product() 
{

    const {id} = useParams() // basically returns an object { id : "69an123" }

    const [product , setProduct] = useState({})

    const [quantity , setQuantity] = useState(1)

    useEffect(() => {

        fetchProduct()

    } , [id])

    const fetchProduct = async () => {

        console.log("fetch products is called");
        const response = await fetch(`http://localhost:8000/api/v1/product/products/${id}`)

        const data = await response.json()
        console.log(data);

        setProduct(data.data)
    }

    return(
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 px-6 py-12">

        <div className="max-w-6xl mx-auto">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white">

                {/* Product Image */}

                <div className="relative">

                    <div className="absolute -top-4 -left-4 w-24 h-24 bg-pink-400 rounded-full blur-2xl opacity-40"></div>

                    <div className="absolute -bottom-4 -right-4 w-28 h-28 bg-indigo-400 rounded-full blur-2xl opacity-40"></div>

                    <img
                        src={product.images?.[0]?.url}
                        alt={product.name}
                        className="relative w-full h-[500px] object-cover rounded-2xl shadow-xl transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl"
                    />

                </div>


                {/* Product Information */}

                <div className="flex flex-col justify-center">

                    <span className="w-fit px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold">
                        ✨ Featured Product
                    </span>


                    <h1 className="text-4xl font-bold text-gray-900 mt-5">
                        {product?.name}
                    </h1>


                    <h2 className="text-3xl font-bold text-indigo-600 mt-4">
                        ₹{product?.price}
                    </h2>


                    <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full mt-5"></div>


                    <p className="text-gray-600 mt-6 leading-relaxed text-lg">
                        {product?.description}
                    </p>


                    {/* Quantity */}

                    <div className="mt-8">

                        <span className="font-semibold text-gray-800">
                            Quantity
                        </span>

                        <div className="flex items-center mt-3">

                            <div className="flex items-center border-2 border-indigo-200 rounded-xl overflow-hidden">

                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-5 py-2 text-xl font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition"
                                >
                                    -
                                </button>

                                <span className="px-6 py-2 font-bold text-gray-800">
                                    {quantity}
                                </span>

                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-5 py-2 text-xl font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition"
                                >
                                    +
                                </button>

                            </div>

                        </div>

                    </div>


                    {/* Add to Cart */}

                    {/* <button
                        onClick={addToCart}
                        className="mt-8 w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white font-bold text-lg shadow-lg hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
                    >
                        🛒 Add to Cart
                    </button> */}

                </div>

            </div>

        </div>

    </div>
)
}

export default Product