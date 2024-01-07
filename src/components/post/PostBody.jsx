import { Box, Image, Text, VStack } from "@chakra-ui/react"

const PostBody = ({ postImg, postTitle, postDesc }) => {
  return (
    <VStack mt={2} mb={2}>
        <Image rounded={"lg"} src={postImg}/>
        <Box px={1} alignSelf={"flex-start"}>
            <Text fontSize={17} fontWeight={"bold"} lineHeight={"22px"}>
                {postTitle}
            </Text>
            <Text fontSize={16}>
                {postDesc}
            </Text>
        </Box>
    </VStack>
  )
}

export default PostBody