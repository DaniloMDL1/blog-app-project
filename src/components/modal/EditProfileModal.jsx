import { Avatar, Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, VStack } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import { EditProfileContext } from "../../context/EditProfileContext"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, db } from "../../config/firebase"
import { doc, onSnapshot } from "firebase/firestore"

const EditProfileModal = ({ isOpen, onClose }) => {
    const [inputs, setInputs] = useState({
        fullName: "",
        username: "",
        imageUrl: ""
    })
    const { handleEditProfile, isLoading } = useContext(EditProfileContext)
    const [user, loading, error] = useAuthState(auth);
    const [currentUser, setCurrentUser] = useState([])

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
            setCurrentUser(doc.data())
        })

        return () => unsub()
    }, [user.uid])

    return (
        <Modal isOpen={isOpen} onClose={onClose} size={"sm"}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Edit Profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Flex mb={4} align={"center"} gap={4}>
                    {currentUser.profilePic ? (<Avatar src={currentUser.profilePic} size={"lg"}/>) : <Avatar name={currentUser.username} size={"lg"}/>}
                    <Flex flexDir={"column"}>
                        <Text fontSize={17}>Full Name: {currentUser.fullName}</Text>
                        <Text fontSize={17}>Username: {currentUser.username}</Text>
                    </Flex>
                </Flex>
                <VStack>
                    <Input size={"md"} value={inputs.fullName} onChange={(e) => setInputs({...inputs, fullName: e.target.value})} placeholder="Full Name" border={"1px solid"} borderColor={"gray.400"} cursor={"pointer"}/>
                    <Input size={"md"} value={inputs.username} onChange={(e) => setInputs({...inputs, username: e.target.value})} placeholder="Username" border={"1px solid"} borderColor={"gray.400"} cursor={"pointer"}/>
                    <Input size={"md"} value={inputs.imageUrl} onChange={(e) => setInputs({...inputs, imageUrl: e.target.value})} placeholder="Image URL" border={"1px solid"} borderColor={"gray.400"} cursor={"pointer"}/>
                </VStack>

            </ModalBody>
            <ModalFooter>
                <Flex gap={4}>
                    <Button colorScheme='blue' onClick={() => handleEditProfile(inputs)} isLoading={isLoading}>
                        Save Changes
                    </Button>
                    <Button colorScheme="red" onClick={onClose}>
                        Close
                    </Button>
                </Flex>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default EditProfileModal