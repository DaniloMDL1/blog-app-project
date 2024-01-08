import { createContext } from "react";
import useShowToast from "../hooks/useShowToast";
import { arrayRemove, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const DeletePostContext = createContext()

export const DeletePostProvider = ({ children }) => {
    const { showToast } = useShowToast()
    const [user, loading, error] = useAuthState(auth);

    const handleDeletePost = async (post) => {
        try {
            const q = query(collection(db, "users"), where("likedPosts", "array-contains", post.id))
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((docs) => {
                const userRef = doc(db, "users", docs.id)
                updateDoc(userRef, { likedPosts: arrayRemove(post.id) })
            })
            const success = await deleteDoc(doc(db, "posts", post.id))
            if(success) {
                showToast("Success", "Your post is removed", "success")
            }
            const userRef = doc(db, "users", user.uid)
            await updateDoc(userRef, {
                posts: arrayRemove(post.id)
            })

        } catch(error) {
            showToast("Error", error.message, "error")
        }
    }

    return (
        <DeletePostContext.Provider value={{ handleDeletePost }}>
            {children}
        </DeletePostContext.Provider>
    )
}