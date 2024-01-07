import { createContext } from "react";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import useShowToast from "../hooks/useShowToast";

export const LogoutContext = createContext()

export const LogoutProvider = ({ children }) => {
    const [signOut, loading, error] = useSignOut(auth);
    const { showToast } = useShowToast()

    const handleLogout = async () => {
        try {
            const success = await signOut()
            if(success) {
                showToast("Success", "You are logged out", "success")
                localStorage.removeItem("user-info")
            }
        } catch(error) {
            showToast("Error", error.message, "error")
        }
    }

    return (
        <LogoutContext.Provider value={{ handleLogout, loading }}>
            {children}
        </LogoutContext.Provider>
    )
}