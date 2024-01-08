import { Box, Flex } from "@chakra-ui/react"
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { FaRegComment } from "react-icons/fa";
import { useContext, useState } from "react";
import { PostLikesContext } from "../../context/PostLikesContext";
import { MdDelete } from "react-icons/md";
import { DeletePostContext } from "../../context/DeletePostContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";

const PostFooter = ({ post }) => {
    const { handlePostLikes } = useContext(PostLikesContext)
    const { likes, isLiked, postLikes } = handlePostLikes(post)
    const { handleDeletePost } = useContext(DeletePostContext)
    const [user, loading, error] = useAuthState(auth);

    const showDelete = user && user.uid === post.uid 

    return (
        <Flex mt={"auto"} px={2} alignItems={"center"} justify={"space-between"}>
            <Box onClick={postLikes} cursor={"pointer"} position={"relative"}>
                {isLiked ? <MdFavorite fontSize={27} color="red"/> : <MdFavoriteBorder fontSize={27}/>}
                <Box position={"absolute"} top={3} left={5}>
                    {likes}
                </Box>
            </Box>
            <Flex gap={4} alignItems={"center"}>
                <Box cursor={"pointer"}>
                    <FaRegComment fontSize={24}/>
                </Box>
                {showDelete && 
                    <Box cursor={"pointer"} onClick={() => handleDeletePost(post)}>
                        <MdDelete fontSize={24}/>
                    </Box>
                }
                
            </Flex>
        </Flex>
    )
}

export default PostFooter