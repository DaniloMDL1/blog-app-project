import { createContext } from "react";
import useShowToast from "../hooks/useShowToast";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";

export const CreateCommentContext = createContext()

export const CreateCommentProvider = ({ children }) => {
    const { showToast } = useShowToast()
    const [user, loading, error] = useAuthState(auth);

    const handleCreateComment = async (post, commentText) => {
        try {
            if(!commentText) {
                showToast("Error", "You need to comment", "error")
                return
            }

            const userRef = doc(db, "users", user.uid)
            const userSnap = await getDoc(userRef)
            if(userSnap.exists()) {
                const currentUser = userSnap.data()
                const newComment = {
                    id: uuid(),
                    username: currentUser.username,
                    postid: post.id,
                    userProfilePic: currentUser.profilePic,
                    createdAt: Date.now(),
                    commentText: commentText,
                    createdBy: currentUser.uid
                }

                const postRef = doc(db, "posts", post.id)
                await updateDoc(postRef, {
                    comments: arrayUnion(newComment)
                })
            }
        } catch(error) {
            showToast("Error", error.message, "error")
        }
    }

    return (
        <CreateCommentContext.Provider value={{ handleCreateComment }}>
            {children}
        </CreateCommentContext.Provider>

    )
}