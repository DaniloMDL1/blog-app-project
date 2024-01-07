import { Box } from "@chakra-ui/react"
import PostHeader from "./PostHeader"
import PostBody from "./PostBody"
import PostFooter from "./PostFooter"

const Post = ({ postImg, postTitle, postDesc, postCreated, postUser, postUserProfilePic }) => {
  return (
    <Box maxW={"xs"} height={"max-content"} p={2} border={"1px solid"} borderColor={"gray.400"} shadow={"xl"} rounded={"xl"}>
        <PostHeader 
          postUser={postUser} 
          postUserProfilePic={postUserProfilePic} 
          postCreated={postCreated}
        />
        <PostBody 
          postImg={postImg} 
          postTitle={postTitle} 
          postDesc={postDesc}
        />
        <PostFooter />
    </Box>
  )
}

export default Post