import React, { useState } from "react";

function Login() {

    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: [e.target.value]
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            const response = await fetch(
                "http://localhost:8000/api/v1/users/login",
                {
                    method: POST,
                    headers: {
                        "Content-type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify(data)
                }
            )

            const result = await response.json()

            console.log(result);

            if (!response.ok) {
                alert(result.messgae || "login unsuccessfull !!!")
                return
            }

            alert("Login Successfull !!!")


        } catch (error) {
            console.error("The error appeared is : ", error)
            alert("Something went wrong")
        }

    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center px-6">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

                <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
                    Welcome Back
                </h1>

                <p className="text-center text-gray-500 mb-8">
                    Login to your account
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Email */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
                    >
                        Login
                    </button>

                </form>

                <div className="text-center mt-6">

                    <p className="text-gray-500">
                        Don't have an account?
                    </p>

                    <button
                        onClick={() => navigate("/register")}
                        className="text-indigo-600 font-semibold hover:underline mt-1"
                    >
                        Create Account
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Login