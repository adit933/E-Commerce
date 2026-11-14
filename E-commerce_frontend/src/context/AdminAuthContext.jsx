
import {
    createContext,
    useCallback,
    useEffect,
    useState
} from "react";

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {

    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    const refreshAdmin = useCallback(async () => {
        try {
            const response = await fetch(
                "http://localhost:8000/api/v1/users/admin",
                {
                    method: "GET",
                    credentials: "include"
                }
            );

            const result = await response.json();

            if (response.ok) {
                setAdmin(result.data);
                return result.data;
            }

            setAdmin(null);
            return null;

        } catch (error) {
            console.error("Error fetching current admin:", error);
            setAdmin(null);
            return null;
        }
    }, []);

    useEffect(() => {
        const getAdmin = async () => {
            try {
                await refreshAdmin();
            } finally {
                setLoading(false);
            }
        };

        getAdmin();
    }, [refreshAdmin]);

    return (
        <AdminAuthContext.Provider
            value={{
                admin,
                setAdmin,
                loading,
                refreshAdmin
            }}
        >
            {children}
        </AdminAuthContext.Provider>
    );
};
