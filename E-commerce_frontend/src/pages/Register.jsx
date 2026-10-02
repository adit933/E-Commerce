import { json } from "express";
import React from "react";
import { useState } from "react";

function Register(){

    const [formData , setFormData] = useState({
        username : "",
        email : "",
        password : "",
        fullName : "",
        phoneNumber : "",
        street : "",
        city : "",
        state : "",
        country : "",
        pincode : ""
    })

    const [avatar , setAvatar] = useState(null)

    const handleData = (e) => { // for setting the data
        setFormData({
            ...formData, //for keeping the old form data
            [e.target.name] : [e.taret.value]
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = new FormData()

        data.append("username" , formData.username)
        data.append("email" , formData.email)
        data.append("password" , formData.password)
        data.append("fullName" , formData.fullName)
        data.append("phoneNumber" , formData.phoneNumber)

        data.append(
            "address" , 
            JSON.stringify([{
                street : formData.street,
                street: formData.street,
                city: formData.city,
                state: formData.state,
                country: formData.country,
                pincode: formData.pincode
            }])
        )

        data.append("avatar" , avatar)

        try {
            
            const response = await fetch(
                "http://localhost:8000/api/v1/users/register",
                {
                    method : post,
                    body : data
                }
            )

            const result = await resposne.json()

            console.log(result);

            if(!response.ok)
            {
                alert(result.message || "Registration Failed!!!")
                return;
            }

            alert("Registration Successfull !!!")

            navigate("/login")

        } catch (error) {
            console.error("Some Error appeared : " , error)
            alert("Something went wrong !!!")
        }

    }


    return (

        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center px-4 py-10">

            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8">

                <h1 className="text-3xl font-bold text-center text-gray-900">
                    Create Account
                </h1>

                <p className="text-center text-gray-500 mt-2">
                    Register to start shopping
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">

                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full border rounded-xl px-4 py-3"
                        required
                    />

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full border rounded-xl px-4 py-3"
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border rounded-xl px-4 py-3"
                        required
                    />

                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="+919876543210"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="w-full border rounded-xl px-4 py-3"
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border rounded-xl px-4 py-3"
                        required
                    />

                    <div>
                        <label className="block mb-2 font-medium">
                            Profile Picture
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setAvatar(e.target.files[0])}
                            required
                        />
                    </div>

                    <h2 className="text-xl font-semibold pt-4">
                        Address
                    </h2>

                    <input
                        type="text"
                        name="street"
                        placeholder="Street"
                        value={formData.street}
                        onChange={handleChange}
                        className="w-full border rounded-xl px-4 py-3"
                        required
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleChange}
                            className="border rounded-xl px-4 py-3"
                            required
                        />

                        <input
                            type="text"
                            name="state"
                            placeholder="State"
                            value={formData.state}
                            onChange={handleChange}
                            className="border rounded-xl px-4 py-3"
                            required
                        />

                        <input
                            type="text"
                            name="country"
                            placeholder="Country"
                            value={formData.country}
                            onChange={handleChange}
                            className="border rounded-xl px-4 py-3"
                            required
                        />

                        <input
                            type="text"
                            name="pincode"
                            placeholder="Pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            className="border rounded-xl px-4 py-3"
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition"
                    >
                        Create Account
                    </button>

                </form>

                <p className="text-center mt-6 text-gray-600">

                    Already have an account?

                    <button
                        onClick={() => navigate("/login")}
                        className="ml-2 text-indigo-600 font-semibold"
                    >
                        Login
                    </button>

                </p>

            </div>

        </div>
    );
}

export default Register