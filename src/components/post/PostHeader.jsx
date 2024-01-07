import { Avatar, Flex, Text } from "@chakra-ui/react"

const PostHeader = () => {
  return (
    <Flex alignItems={"center"} justify={"space-between"}>
        <Flex alignItems={"center"} gap={2}>
            <Avatar size={"sm"}/>
            <Text fontSize={"17px"}>Username</Text>
        </Flex>
        <Text fontSize={"15px"}>2d ago</Text>
    </Flex>
  )
}

export default PostHeader