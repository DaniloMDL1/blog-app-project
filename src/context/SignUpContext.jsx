import { createContext } from "react";
import { auth, db } from "../config/firebase";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import useShowToast from "../hooks/useShowToast";
import { doc, setDoc } from "firebase/firestore";

export const SignUpContext = createContext()

export const SignUpProvider = ({ children }) => {
    const { showToast } = useShowToast()
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const handleSignUp = async (inputs) => {
        try {
            if(!inputs.fullName || !inputs.username || !inputs.email || !inputs.password) {
                showToast("Error", "Please fill all the fields", "error")
            }

            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password)

            if(!newUser && error) {
                showToast("Error", error.message , "error")
            }
            if(newUser) {
                const userDoc = {
                    uid: newUser.user.uid,
                    fullName: inputs.fullName,
                    username: inputs.username,
                    email: inputs.email,
                    profilePic: "",
                    posts: [],
                    likedPosts: [],
                    createdAt: Date.now()
                }

                await setDoc(doc(db, "users", newUser.user.uid), userDoc)
                localStorage.setItem("user-info", JSON.stringify(userDoc))
            }

        } catch(error) {
            showToast("Error", error.message, "error")
        }
    }

    return (
        <SignUpContext.Provider value={{ handleSignUp, error, loading }}>
            {children}
        </SignUpContext.Provider>
    )
}