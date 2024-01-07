import { Box, Flex, } from "@chakra-ui/react"
import Post from "./Post"
import { useEffect, useState } from "react"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { auth, db } from "../../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"

const Posts = () => {
  const [posts, setPosts] = useState([])
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"))
    const unsub = onSnapshot(q, (querySnapshot) => {
      const newPosts = []
      querySnapshot.forEach((doc) => {
        newPosts.push({ id: doc.id, ...doc.data()})
      })
      setPosts(newPosts)
    })

    return () => unsub()
  }, [])

  return (
    <Box w={"full"}>
      <Flex gap={12} flexWrap={"wrap"}>
        {posts.map((post) => (
          <Post 
            key={post.id} 
            postImg={post.postImage} 
            postTitle={post.postTitle}
            postDesc={post.postDescription}
            postCreated={post.createdAt}
            postUser={post.createdBy}
            postUserProfilePic={post.userProfilePic}
          />
        ))}
      </Flex>
    </Box>
  )
}

export default Posts