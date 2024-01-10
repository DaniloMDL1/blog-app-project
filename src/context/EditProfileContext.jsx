import { createContext, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { auth, db } from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

export const EditProfileContext = createContext()

export const EditProfileProvider = ({ children }) => {
    const { showToast } = useShowToast()
    const [isLoading, setIsLoading] = useState(false)
    const currentUser = JSON.parse(localStorage.getItem("user-info"))
    const [user, loading, error] = useAuthState(auth);

    const handleEditProfile = async (inputs) => {
        setIsLoading(true)
        try {
            const userRef = doc(db, "users", user.uid)
            const userSnap = await getDoc(userRef)
            
            const updateUser = {
                ...currentUser,
                fullName: inputs.fullName || currentUser.fullName,
                username: inputs.username || currentUser.username,
                profilePic: inputs.imageUrl || currentUser.profilePic
            }

            if(userSnap.exists()) {
                const updateFirebaseUser = {
                    fullName: inputs.fullName || userSnap.data().fullName,
                    username: inputs.username || userSnap.data().username,
                    profilePic: inputs.imageUrl || userSnap.data().profilePic
                }

                await updateDoc(userRef, updateFirebaseUser)
            }
            
            
            localStorage.setItem("user-info", JSON.stringify(updateUser))
            showToast("Success", "You updated profile", "success")

        } catch(error) {
            showToast("Error", error.message, "error")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <EditProfileContext.Provider value={{ handleEditProfile, isLoading }}>
            {children}
        </EditProfileContext.Provider>
    )
}