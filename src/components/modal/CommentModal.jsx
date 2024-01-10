import { Button, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react"
import CommentBody from "../comment/CommentBody"
import { useContext, useEffect, useState } from "react"
import { CreateCommentContext } from "../../context/CreateCommentContext"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "../../config/firebase"

const CommentModal = ({ isOpen, onClose, post }) => {
    const [commentText, setCommentText] = useState("")
    const { handleCreateComment } = useContext(CreateCommentContext)
    const [comments, setComments] = useState([])

    const createComment = () => {
        handleCreateComment(post, commentText)
        setCommentText("")
    }

    useEffect(() => {
        const postRef = doc(db, "posts", post.id)
        const unsub = onSnapshot(postRef, (doc) => {
            const postData = doc.data()
            if(postData && postData.comments) {
                setComments(doc.data().comments)
            } else {
                setComments([])
            }
        })

        return () => unsub()
    }, [post.id])

    return (
        <Modal isOpen={isOpen} onClose={onClose} size={{base: "xs", md: "sm"}}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Comments for this post</ModalHeader>
            <ModalCloseButton />
            <ModalBody overflowY={"auto"} maxH={"lg"}>
                {comments.length === 0 && 
                    <Text fontSize={17}>No comments on this post</Text>
                }
                {comments?.sort((a, b) => b.createdAt - a.createdAt).map((comment) => (
                    <CommentBody 
                        key={comment.id} 
                        commentText={comment.commentText}
                        commentCreatedAt={comment.createdAt}
                        username={comment.username}
                        userProfilePic={comment.userProfilePic}
                    />
                ))}
            </ModalBody>
            <ModalFooter>
                <InputGroup>
                    <Input cursor={"pointer"} value={commentText} onChange={(e) => setCommentText(e.target.value)} variant={"flushed"}/>
                    <InputRightElement>
                        <Button onClick={createComment} bg={"transparent"} _hover={{ bg: "transparent" }} color={"blue.500"}>
                            Post
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default CommentModal