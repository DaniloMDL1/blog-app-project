import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useColorMode } from "@chakra-ui/react"
import { useContext, useState } from "react"
import { CreatePostContext } from "../../context/CreatePostContext"

const PostModal = ({ isOpen, onClose }) => {
    const { colorMode, toggleColorMode } = useColorMode()
    const [inputs, setInputs] = useState({
        postImg: "",
        postTitle: "",
        postDesc: ""
    })

    const { handleCreatePost, loading } = useContext(CreatePostContext)

    const createPost = () => {
        handleCreatePost(inputs)
        if(inputs.postImg && inputs.postTitle && inputs.postDesc) {
            setInputs({...inputs, postImg: "", postTitle: "", postDesc: ""})
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} size={{ base: "xs", md: "sm"}}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Create Post</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Input value={inputs.postImg} onChange={(e) => setInputs({...inputs, postImg: e.target.value})} type="text" cursor={"pointer"} mb={2} border={"1px solid"} borderColor={colorMode === "light" ? "gray.300" : "whiteAlpha.300"} placeholder="Image URL"/>
                <Input value={inputs.postTitle} onChange={(e) => setInputs({...inputs, postTitle: e.target.value})} type="text" cursor={"pointer"} mb={2} border={"1px solid"} borderColor={colorMode === "light" ? "gray.300" : "whiteAlpha.300"} placeholder="Title for the post"/>
                <Textarea value={inputs.postDesc} onChange={(e) => setInputs({...inputs, postDesc: e.target.value})} resize={"none"} placeholder="Description for the post" cursor={"pointer"} border={"1px solid"} borderColor={colorMode === "light" ? "gray.300" : "whiteAlpha.300"}/>
            </ModalBody>
            <ModalFooter>
                <Button onClick={createPost} isLoading={loading} colorScheme="blue">
                    Add Post
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default PostModal