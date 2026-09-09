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
            left: 300,
            behavior: "smooth"
        })
    }

    return (
        <div className="relative overflow-hidden px-12 py-16 lg:px-20 bg-gradient-to-br from-slate-50 via-white to-indigo-50">

            {/* Background blur effects */}
            <div className="absolute -top-24 -left-24 w-[350px] h-[350px] rounded-full bg-purple-400/20 blur-3xl"></div>

            <div className="absolute -bottom-24 -right-24 w-[350px] h-[350px] rounded-full bg-blue-400/20 blur-3xl"></div>


            {/* Section content */}
            <div className="relative z-10 flex flex-col gap-8">

                {/* Heading */}
                <div>
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600">
                        🛍️ Explore
                    </span>

                    <h1 className="mt-4 text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
                        Categories
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Browse products by category.
                    </p>
                </div>


                {/* Carousel */}
                <div className="relative">

                    {/* Left button */}
                    <button
                        onClick={leftScroll}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-20
                bg-white/90 backdrop-blur-md shadow-lg
                rounded-full w-11 h-11
                flex items-center justify-center
                text-xl text-gray-700
                transition-all duration-300
                hover:bg-white hover:scale-110"
                    >
                        ←
                    </button>


                    {/* Left fade */}
                    <div
                        className="absolute left-0 top-0 z-10 h-full w-20
                bg-gradient-to-r from-slate-50 via-slate-50/60 to-transparent
                pointer-events-none"
                    />


                    {/* Category cards */}
                    <div
                        ref={scrollref}
                        className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-none px-2"
                    >

                        {categories.map((category) => (

                            <div
                                key={category.id}
                                className="group shrink-0 w-64
                        overflow-hidden rounded-2xl
                        border border-white/60
                        bg-white/70 backdrop-blur-xl
                        shadow-lg
                        transition-all duration-300
                        hover:-translate-y-2 hover:shadow-2xl"
                            >

                                {/* Image */}
                                <div className="relative overflow-hidden">

                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-full h-64 object-cover
                                transition-transform duration-500
                                group-hover:scale-105"
                                    />

                                    {/* Image overlay */}
                                    <div className="absolute inset-0
                                bg-gradient-to-t from-black/40
                                via-transparent to-transparent
                                opacity-0 group-hover:opacity-100
                                transition-opacity duration-300"
                                    />

                                </div>


                                {/* Category name */}
                                <div className="p-5 flex items-center justify-between">

                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {category.name}
                                    </h3>

                                    <span className="text-gray-500 transition-transform duration-300 group-hover:translate-x-1">
                                        →
                                    </span>

                                </div>

                            </div>

                        ))}

                    </div>


                    {/* Right fade */}
                    <div
                        className="absolute right-0 top-0 z-10 h-full w-20
                bg-gradient-to-l from-slate-50 via-slate-50/60 to-transparent
                pointer-events-none"
                    />


                    {/* Right button */}
                    <button
                        onClick={rightScroll}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-20
                bg-white/90 backdrop-blur-md shadow-lg
                rounded-full w-11 h-11
                flex items-center justify-center
                text-xl text-gray-700
                transition-all duration-300
                hover:bg-white hover:scale-110"
                    >
                        →
                    </button>

                </div>

            </div>

        </div>

    )
}

export default Category


