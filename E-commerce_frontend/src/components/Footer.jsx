import React from "react";

function Footer() {
    return (

         <div className="bg-gray-950 text-white mx-auto px-7 py-14">
            <div className="max-w-7xl mx-auto px-8 py-16">

                {/* Main footer content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16">

                    {/* Brand */}
                    <div>
                        <h2
                        className="text-2xl font-bold tracking-tight"
                        >YourStore</h2>

                        <p
                        className="mt-6 text-sm leading-6 text-gray-400 max-w-xs"
                        >
                            Discover products carefully selected
                            for your everyday life.
                        </p>
                    </div>

                    {/* Shop */}
                    <div>
                        <h3
                        className="text-sm font-semibold tracking-wider uppercase"
                        >Shop</h3>
                        <ul className="mt-4 text-sm space-y-3 font-semibold">
                            <li
                                className="cursor-pointer hover:text-white transition-color duration-200"
                            >All Products</li>
                            <li
                            className="cursor-pointer hover:text-white transition-color duration-200"
                            >Categories</li>
                            <li
                            className="cursor-pointer hover:text-white transition-color duration-200"
                            >New Arrivals</li>
                            <li
                            className="cursor-pointer hover:text-white transition-color duration-200"
                            >Featured</li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3
                        className="text-sm font-semibold tracking-wider uppercase"
                        >Company</h3>
                        <ul
                        className="mt-4 text-sm space-y-3 font-semibold"
                        >
                            <li
                            className="cursor-pointer hover:text-white transition-color duration-200"
                            >About Us</li>
                            <li
                            className="cursor-pointer hover:text-white transition-color duration-200"
                            >Contact</li>
                            <li
                            className="cursor-pointer hover:text-white transition-color duration-200"
                            >FAQ</li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3>Follow Us</h3>
                        {/* social icons */}
                    </div>

                </div>

                {/* Bottom */}
                <div>
                    © 2026 YourStore
                </div>

            </div>
        </div>
    )
}

export default Footer