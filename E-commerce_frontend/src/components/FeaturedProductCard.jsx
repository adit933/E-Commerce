import React from "react";
import { useRef } from "react";


function FeaturedProduct({ product }) {

    return (
        // <div
        //     className="px-12 py-16 flex flex-col gap-6">
        //     <h1
        //         className="text-3xl font-bold"
        //     >
        //         Featured Products
        //     </h1>


        //     <div className="grid grid-cols-4 gap-6 ">

        //         {product.map((pr) => (
        //             <div className="rounded-xl border overflow-hidden">

        //             <img
        //                 src = {`${pr.image}`}
        //                 alt="Product"
        //                 className="w-full h-64 object-cover"
        //             />

        //             <div className="p-4">
        //                 <h3 className="text-lg font-semibold">
        //                     {pr.name}
        //                 </h3>

        //                 <p className="text-gray-500">
        //                     Product description
        //                 </p>

        //                 <p className="mt-2 font-bold">
        //                     {pr.price}
        //                 </p>
        //             </div>

        //         </div>
        //         ))}


        //     </div>
        // </div>
<div className="relative overflow-hidden px-12 py-16 lg:px-20 bg-gradient-to-br from-slate-50 via-white to-indigo-50">

    {/* Background blur effects */}
    <div className="absolute -top-24 -right-24 w-[350px] h-[350px] rounded-full bg-purple-400/20 blur-3xl"></div>

    <div className="absolute -bottom-24 -left-24 w-[350px] h-[350px] rounded-full bg-blue-400/20 blur-3xl"></div>


    {/* Section content */}
    <div className="relative z-10 flex flex-col gap-10">

        {/* Heading */}
        <div>
            <span className="inline-flex items-center rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600">
                ✨ Our Selection
            </span>

            <h1 className="mt-4 text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
                Featured Products
            </h1>

            <p className="mt-2 text-gray-600">
                Discover some of our most popular products.
            </p>
        </div>


        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {product.map((pr) => (

                <div
                    key={pr.id}
                    className="group overflow-hidden rounded-2xl border border-white/60 bg-white/70 backdrop-blur-xl shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >

                    {/* Image */}
                    <div className="relative overflow-hidden">

                        <img
                            src={pr.image}
                            alt={pr.name}
                            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Featured badge */}
                        <span className="absolute top-4 left-4 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-semibold text-gray-700 shadow">
                            Featured
                        </span>

                    </div>


                    {/* Product information */}
                    <div className="p-5">

                        <h3 className="text-lg font-semibold text-gray-900">
                            {pr.name}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                            Product description
                        </p>

                        <div className="mt-4 flex items-center justify-between">

                            <p className="text-xl font-bold text-gray-900">
                                ₹{pr.price}
                            </p>

                            <button
                                className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
                            >
                                View
                            </button>

                        </div>

                    </div>

                </div>

            ))}

        </div>

    </div>

</div>



        
    )

}

export default FeaturedProduct