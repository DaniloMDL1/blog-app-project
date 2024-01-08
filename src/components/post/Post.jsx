import { Box } from "@chakra-ui/react"
import PostHeader from "./PostHeader"
import PostBody from "./PostBody"
import PostFooter from "./PostFooter"

const Post = ({ post, postImg, postTitle, postDesc, postCreated, postUser, postUserProfilePic }) => {
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
        <PostFooter post={post}/>
    </Box>
  )
}

export default Post