import { createContext, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

export const PostLikesContext = createContext()

export const PostLikesProvider = ({ children }) => {
    
    const handlePostLikes = (post) => {
        const { showToast } = useShowToast() 
        const [user, loading, error] = useAuthState(auth)
        const [likes, setLikes] = useState(post.likes.length)
        const [isLiked, setIsLiked] = useState(post.likes.includes(user.uid))

        const postLikes = async () => {
            try {
                const userRef = doc(db, "users", user.uid)
                const postRef = doc(db, "posts", post.id)
                await updateDoc(postRef, {
                    likes: isLiked ? arrayRemove(user.uid) : arrayUnion(user.uid)
                })

                await updateDoc(userRef, {
                    likedPosts: isLiked ? arrayRemove(post.id) : arrayUnion(post.id)
                })

                setIsLiked(!isLiked)
                isLiked ? setLikes(likes - 1) : setLikes(likes + 1)
            } catch(error) {
                showToast("Error", error.message, "error")
            }
        }

        return { isLiked, likes, postLikes }
    }

    return (
        <PostLikesContext.Provider value={{ handlePostLikes }}>
            {children}
        </PostLikesContext.Provider>
    )
}