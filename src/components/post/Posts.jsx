import { Box, Flex, Spinner, Text, } from "@chakra-ui/react"
import Post from "./Post"
import { useEffect, useState } from "react"
import { collection, doc, getDoc, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { auth, db } from "../../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useLocation } from "react-router-dom"

const Posts = () => {
  const [posts, setPosts] = useState([])
  const [user, loading, error] = useAuthState(auth);
  const { pathname } = useLocation()
  const [username, setUsername] = useState("")
  const [loadingPosts, setLoadingPosts] = useState(false)
  let unsub
    
  useEffect(() => {
      const getUsers =  async () => {
          const userRef = doc(db, "users", user.uid)
          const userSnap = await getDoc(userRef)
          if(userSnap.exists()) {
              setUsername(userSnap.data().username)
          }
      }

      getUsers()
  }, [user.uid])

  useEffect(() => {
    if(pathname === "/") {
      const q = query(collection(db, "posts"), orderBy("createdAt", "desc"))
      unsub = onSnapshot(q, (querySnapshot) => {
        const newPosts = []
        querySnapshot.forEach((doc) => {
          newPosts.push({ id: doc.id, ...doc.data() })
        })
        setPosts(newPosts)
      })
    } else if(pathname === `/${username}/posts`) {
      setLoadingPosts(true)
      const q = query(collection(db, "posts"), where("uid", "==", user.uid), orderBy("createdAt", "desc"))
      unsub = onSnapshot(q, (querySnapshot) => {
        const currentUserPosts = []
        querySnapshot.forEach((doc) => {
          currentUserPosts.push({ id: doc.id, ...doc.data() })
        })
        setPosts(currentUserPosts)
        setLoadingPosts(false)
      })
    } else if(pathname === `/${username}/liked-posts`) {
      setLoadingPosts(true)
      const q = query(collection(db, "posts"), where("likes", "array-contains", user.uid), orderBy("createdAt", "desc"))
      unsub = onSnapshot(q, (querySnapshot) => {
        const userLikedPosts = []
        querySnapshot.forEach((doc) => {
          userLikedPosts.push({ id: doc.id, ...doc.data() })
        })
        setPosts(userLikedPosts)
        setLoadingPosts(false)
      })
    }

    return () => {
      if(unsub) {
        unsub()
      }
    }
  }, [pathname, username])

  return (
    <Box w={"full"}>
      {loadingPosts && 
        <Flex justify={"center"}>
          <Spinner size={"xl"}/>
        </Flex>
      }
      {!loadingPosts && pathname === `/${username}/posts` && posts.length === 0 &&
        <Text fontSize={"25px"} textAlign={"center"}>No posts for now</Text>
      }
      {!loadingPosts && pathname === `/${username}/liked-posts` && posts.length === 0 &&
        <Text fontSize={"25px"} textAlign={"center"}>No liked posts for now</Text>
      }
      <Flex gap={12} flexWrap={"wrap"}>
        {posts.map((post) => (
          <Post 
            key={post.id}
            post={post} 
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