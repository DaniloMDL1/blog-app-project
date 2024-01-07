import { Avatar, Flex, Text } from "@chakra-ui/react"
import { timeAgo } from "../../utils/timeAgo"

const PostHeader = ({ postUser, postUserProfilePic, postCreated }) => {
  return (
    <Flex alignItems={"center"} justify={"space-between"}>
        <Flex alignItems={"center"} gap={2}>
            {postUserProfilePic ? (<Text>user</Text>) : <Avatar size={"sm"}/>}
            <Text fontSize={"17px"}>{postUser}</Text>
        </Flex>
        <Text fontSize={"15px"}>{timeAgo(postCreated)}</Text>
    </Flex>
  )
}

export default PostHeader