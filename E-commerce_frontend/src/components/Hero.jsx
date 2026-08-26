import React from "react";

function Hero() {
    return (
        <div
            className="min-h-[calc(100vh-68px)] px-12 lg:px-20 flex items-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50"
        > {/* main body of the hero section */}

        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-purple-400/30 blur-3xl"></div>

        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-blue-400/30 blur-3xl"></div>


            <div
                className="relative z-10 w-1/2 justify-center items-center animate-[fadeInUp_1s_cubic-bezier(0.16,1,0.3,1)]"
            > {/* left section */}

                <span
                    className="inline-flex items-center rounded-full bg-gray-100 px-4 py-2 text-sm font-medium"
                >
                    ✨ Discover Something New

                </span>

                <h1
                    className=" mt-5 text-5xl lg:text-7xl font-bold tracking-tighter leading-[1.06] text-gray-900"
                >
                    Everything you want.
                    <br />
                    All in one place.
                </h1>

                <p
                    className="mt-6 max-w-xl text-lg leading-8 text-gray-600"
                >
                    Explore products carefully selected for your everyday life.
                    Simple shopping, great products, delivered to your door.
                </p>

                <div
                    className="mt-8 flex gap-3"
                >
                    <button
                        className="rounded-lg bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800"
                    >Shop Now →</button>
                    <button
                        className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
                    >Explore Categories</button>
                </div>

            </div>

            <div
                className="relative z-10 w-1/2 flex justify-center items-center"
            > {/* right section */}
                <div className="relative w-[450px] h-[450px] rounded-[2rem] bg-gradient-to-br from-gray-100 via-white to-gray-200 overflow-hidden shadow-2xl transition-transform duration-500 hover:-translate-y-2">

                    <img src="../src/assets/shutter-speed-BQ9usyzHx_w-unsplash.jpg" alt=""
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />


                    <div className="absolute bottom-6 left-6 rounded-2xl bg-white/90 backdrop-blur-20xl px-5 py-4 shadow-xl">
                        <p className="text-xs uppercase tracking-wider text-gray-500">
                            Today's Pick
                        </p>

                        <p className="mt-1 font-semibold text-gray-900">
                            Premium Collection
                        </p>
                    </div>


                </div>
            </div>

        </div>
    )
}

export default Hero