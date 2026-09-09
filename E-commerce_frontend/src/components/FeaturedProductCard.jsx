import React from "react";
import { useRef } from "react";


function FeaturedProduct({ product }) {

    return (
        <div
            className="px-12 py-16 flex flex-col gap-6">
            <h1
                className="text-3xl font-bold"
            >
                Featured Products
            </h1>


            <div className="grid grid-cols-4 gap-6 ">

                {product.map((pr) => (
                    <div className="rounded-xl border overflow-hidden">

                    <img
                        src = {`${pr.image}`}
                        alt="Product"
                        className="w-full h-64 object-cover"
                    />

                    <div className="p-4">
                        <h3 className="text-lg font-semibold">
                            {pr.name}
                        </h3>

                        <p className="text-gray-500">
                            Product description
                        </p>

                        <p className="mt-2 font-bold">
                            {pr.price}
                        </p>
                    </div>

                </div>
                ))}


            </div>
        </div>
    )

}

export default FeaturedProduct