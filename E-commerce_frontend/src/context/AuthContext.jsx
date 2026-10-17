import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user , setUser] = useState(null)

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

        }

        getUser()

    } , [])

    return(

        <AuthContext.Provider value = {{user , setUser}}>
            {children}
        </AuthContext.Provider>
    )

}

