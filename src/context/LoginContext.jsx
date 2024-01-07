import { createContext } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase";
import useShowToast from "../hooks/useShowToast";
import { doc, getDoc } from "firebase/firestore";

export const LoginContext = createContext()

export const LoginProvider = ({ children }) => {
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const { showToast } = useShowToast()

    const handleLogin = async (inputs) => {
        try {
            if(!inputs.email || !inputs.password) {
                showToast("Error", "Please fill all the fields", "error")
            }
            const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password)
            if(!userCred && error) {
                showToast("Error", error.message, "error")
            }

            if(userCred) {
                const userRef = doc(db, "users", userCred.user.uid)
                const userSnap = await getDoc(userRef)
                localStorage.setItem("user-info", JSON.stringify(userSnap.data()))
                showToast("Success", "You are logged in", "success")
            }   

        } catch(error) {
            showToast("Error", error.message, "error")
        }
    }

    return (
        <LoginContext.Provider value={{ handleLogin, loading, error }}>
            {children}
        </LoginContext.Provider>
    )
}