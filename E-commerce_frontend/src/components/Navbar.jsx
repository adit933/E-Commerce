import React from "react";
import { NavLink } from "react-router-dom"

function Navbar() {

    return (
            <div
            className="h-17 w-full px-12 bg-white flex items-center justify-between 
            shadow-sm"
            >

                <div
                >

                    <img src="src/assets/dmitry-mashkin-adCT4qOQeY4-unsplash.jpg" alt=""
                        className="w-12 h-12 object-cover
                                rounded-2xl" />

                </div>

                {/* Navigation */}
                <div className="flex items-center gap-8">

                    <NavLink to="/"
                    end
                    className={({isActive})=>
                        `text-sm font-medium transition-colours ${
                            isActive ? "text-blue-600" : "text-gray-700 hover:text-gray-500"
                        }`
                    }
                    >
                        Home
                    </NavLink>

                    <NavLink to="/shop"
                    
                    className={({isActive}) => 
                        `text-sm font-medium transition-colors ${
                            isActive ? "text-blue-600" : "text-gray-700 hover:text-gray-500"
                        }`
                    }
                    >
                        shop
                    </NavLink>

                    <NavLink to="/categories"
                    className={({isActive}) => 
                        `text-sm font-medium transition-colors ${
                            isActive ? "text-blue-600" : "text-gray-700 hover:text-gray-500"
                        }`
                    }
                    >
                        categories
                    </NavLink>

                    <NavLink to="/about"
                    className={({isActive}) => 
                        `text-sm font-medium transition-colors ${
                            isActive ? "text-blue-600" : "text-gray-700 hover:text-gray-500"
                        }`
                    }
                    >
                        about
                    </NavLink>


                </div>

                <div className="flex items-center gap-6">

                    <NavLink to="/wishlist"
                    className="text-sm font-medium hover:text-gray-500 transition-colors">
                        Wishlist
                    </NavLink>

                    <NavLink to="/cart"
                    className="text-sm font-medium hover:text-gray-500 transition-colors">
                        Cart
                    </NavLink>

                    <NavLink to="/profile"
                    className="text-sm font-medium hover:text-gray-500 transition-colors">
                        Profile
                    </NavLink>

                </div>

            </div>
    )

}

export default Navbar