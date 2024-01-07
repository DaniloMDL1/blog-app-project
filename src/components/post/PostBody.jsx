import { Box, Image, Text, VStack } from "@chakra-ui/react"

const PostBody = () => {
  return (
    <VStack mt={2} mb={2}>
        <Image rounded={"lg"} src="https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/718RsRagEeL._AC_UF1000,1000_QL80_.jpg"/>
        <Box px={1} alignSelf={"flex-start"}>
            <Text fontSize={17} fontWeight={"bold"} lineHeight={"22px"}>
                Title of The Post
            </Text>
            <Text fontSize={16}>
                Description for the post
            </Text>
        </Box>
    </VStack>
  )
}

export default PostBody