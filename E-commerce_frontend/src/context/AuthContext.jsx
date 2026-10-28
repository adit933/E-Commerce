import { createContext, useCallback, useEffect, useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)

    const [loading, setLoading] = useState(true)


    const refreshUser = useCallback(async () => {
        try {

            const response = await fetch(
                "http://localhost:8000/api/v1/users/user",
                {
                    method: "GET",
                    credentials: "include"
                }
            )

            const result = await response.json()

            console.log("Current User : ", result);

            if (response.ok) {
                setUser(result.data);
                return result.data
            }

            setUser(null)
            return null

        } catch (error) {
            console.error("Error fetching current user : ", error)
        }

    } , []

    )




    useEffect(() => {
        const getUser = async () => {

            try {
                await refreshUser()
            } finally{
                setLoading(false)
            }

        }

        getUser()
        
    }, [refreshUser])

return (

    <AuthContext.Provider value={{ user, setUser, loading , refreshUser }}>
        {children}
    </AuthContext.Provider>
)

}

