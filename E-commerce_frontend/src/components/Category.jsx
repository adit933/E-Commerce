import React from "react";
import { useRef } from "react";

function Category({ categories }) {

    const scrollref = useRef(null);

    const leftScroll = () => {
        scrollref.current.scrollBy({
            left: -300,
            behavior: "smooth"
        })
    }

    const rightScroll = () => {
        scrollref.current.scrollBy({
            left : 300,
            behavior: "smooth"
        })
    }

    return (
        <div
            className="px-12 py-16 flex flex-col gap-6">
            <h1
                className="text-3xl font-bold mb-8"
            >
                Categories
            </h1>

            <div className="relative">

                <button
                    onClick={leftScroll}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20
                   bg-white shadow-md rounded-full
                   w-10 h-10 flex items-center justify-center
                   text-xl"
                >
                    ←
                </button>


                {/* Left blur */}
                <div className="absolute left-0 top-0 z-10 h-full w-14
                    bg-gradient-to-r from-white to-transparent
                    pointer-events-none" />

                {/* Your carousel */}
                < div
                    ref={scrollref}
                    className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-none" >

                    {
                        categories.map((category) => (
                            <div className="shrink-0 w-64 rounded-xl border overflow-hidden">

                                <img
                                    src={`${category.image}`}
                                    alt={category.name}
                                    className="w-full h-64 object-cover"
                                />

                                <div className="p-4">
                                    <h3 className="text-lg font-semibold">
                                        {category.name}
                                    </h3>
                                </div>

                            </div>
                        ))
                    }


                </div >

                {/* Right blur */}
                <div className="absolute right-0 top-0 z-10 h-full w-14
                    bg-gradient-to-l from-white to-transparent
                    pointer-events-none" />


                <button
                    onClick={rightScroll}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20
                   bg-white shadow-md rounded-full
                   w-10 h-10 flex items-center justify-center
                   text-xl"
                >
                    →
                </button>

            </div>

        </div>
    )
}

export default Category


