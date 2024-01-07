import { Box, Flex } from "@chakra-ui/react"
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { FaRegComment } from "react-icons/fa";
import { useState } from "react";

const PostFooter = () => {
    const [isLiked, setIsLiked] = useState(false)

    return (
        <Flex mt={"auto"} px={2} alignItems={"center"} gap={2}>
            <Box onClick={() => setIsLiked(!isLiked)} cursor={"pointer"}>
                {isLiked ? <MdFavorite fontSize={27} color="red"/> : <MdFavoriteBorder fontSize={27}/>}
            </Box>
            <Box cursor={"pointer"}>
                <FaRegComment fontSize={24}/>
            </Box>
        </Flex>
    )
}

export default PostFooter