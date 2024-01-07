import { Box } from "@chakra-ui/react"
import PostHeader from "./PostHeader"
import PostBody from "./PostBody"
import PostFooter from "./PostFooter"

const Post = () => {
  return (
    <Box maxW={"xs"} p={2} border={"1px solid"} borderColor={"gray.400"} shadow={"xl"} rounded={"xl"}>
        <PostHeader />
        <PostBody />
        <PostFooter />
    </Box>
  )
}

export default Post