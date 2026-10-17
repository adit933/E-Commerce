import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext";

function Navbar() {

    const navigate = useNavigate();

    const {user} = useContext(AuthContext)

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

                   {
                    user ?  <>

                     <button
                        onClick={() => navigate("/login")}
                        className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                    >
                        LogOut
                    </button>

                    <button
                        onClick={() => navigate("/register")}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Profile
                    </button>
                    
                    </> : <>

                     <button
                        onClick={() => navigate("/login")}
                        className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                    >
                        Login
                    </button>

                    <button
                        onClick={() => navigate("/register")}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Register
                    </button>
                    
                    </>
                   }

                </div>

            </div>
    )

}

export default Navbar