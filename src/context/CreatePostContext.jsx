import { createContext } from "react";
import useShowToast from "../hooks/useShowToast";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase";
import { addDoc, arrayUnion, collection, doc, getDoc, updateDoc } from "firebase/firestore";

export const CreatePostContext = createContext()

export const CreatePostProvider = ({ children }) => {
    const { showToast } = useShowToast()
    const [user, loading, error] = useAuthState(auth);

    const handleCreatePost = async (inputs) => {
        try {
            if(!inputs.postImg || !inputs.postTitle || !inputs.postDesc) {
                showToast("Error", "Please fill all the fields", "error")
                return
            }

            const userRef = doc(db, "users", user.uid)
            const userSnap = await getDoc(userRef)

            if(userSnap.exists()) {
                const currentUser = userSnap.data()
                const postDoc = {
                    postImage: inputs.postImg,
                    postTitle: inputs.postTitle,
                    postDescription: inputs.postDesc,
                    likes: [],
                    comments: [],
                    createdAt: Date.now(),
                    createdBy: currentUser.username,
                    userProfilePic: currentUser.profilePic
                }
                
                const postDocRef = await addDoc(collection(db, "posts"), postDoc)
                await updateDoc(userRef, {
                    posts: arrayUnion(postDocRef.id)
                })
            }


        } catch(error) {
            showToast("Error", error.message, "error")
        }
    }   

    return (
        <CreatePostContext.Provider value={{ handleCreatePost, loading }}>
            {children}
        </CreatePostContext.Provider>
    )
}