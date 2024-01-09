import { Avatar, Divider, Flex, Text, VStack } from "@chakra-ui/react"
import { timeAgo } from "../../utils/timeAgo"

const CommentBody = ({ commentText, commentCreatedAt, username, userProfilePic }) => {

    return (
        <VStack mb={2} alignItems={"flex-start"} border={"1px solid"} borderColor={"gray.300"} p={3} rounded={"lg"}>
            <Flex justify={"space-between"} w={"full"}>
                <Flex align={"center"} gap={2}>
                    <Avatar size={'xs'}/>
                    <Text fontSize={15}>{username}</Text>
                </Flex>
                <Text fontSize={14}>{timeAgo(commentCreatedAt)}</Text>
            </Flex>
            <Divider h={1}/>
            <Text>{commentText}</Text>
        </VStack>
    )
}

export default CommentBody