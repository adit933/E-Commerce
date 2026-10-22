import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user , setUser] = useState(null)

    const [loading , setLoading] = useState(true)

    useEffect(() => {
        const getUser = async () => {

            try {
                
                const response = await fetch(
                    "http://localhost:8000/api/v1/users/user",
                    {
                        method : "GET",
                        credentials : "include"
                    }
                )

                const result = await response.json()

                console.log("Current User : " , result);

                if(response.ok)
                {
                    setUser(result.data);
                }

            } catch (error) {
                console.error("Error fetching current user : " , error)
            }
            finally{
                setLoading(false)
            }

        }

        getUser()

    } , [])

    return(

        <AuthContext.Provider value = {{user , setUser , loading}}>
            {children}
        </AuthContext.Provider>
    )

}

