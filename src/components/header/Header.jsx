import { Avatar, Box, Button, Container, Flex, Link, Menu, MenuButton, MenuItem, MenuList, useColorMode, useDisclosure } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"
import { FaMoon } from "react-icons/fa6";
import { FaSun } from "react-icons/fa";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useContext, useEffect, useState } from "react";
import { LogoutContext } from "../../context/LogoutContext";
import PostModal from "../modal/PostModal";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";

const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    const { handleLogout, loading } = useContext(LogoutContext)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [user, , error] = useAuthState(auth);
    const [username, setUsername] = useState("")
    
    useEffect(() => {
        const getUsers =  async () => {
            const userRef = doc(db, "users", user.uid)
            const userSnap = await getDoc(userRef)
            if(userSnap.exists()) {
                setUsername(userSnap.data().username)
            }
        }

        getUsers()
    }, [user.uid])

    return (
        <Box position={"fixed"} py={5} top={0} right={0} left={0} zIndex={10} bg={colorMode === "light" ? "white" : "gray.800"} h={"80px"} borderBottom={"1px solid"} borderColor={colorMode === "light" ? "gray.100" : "gray.700"}>
            <Container maxW={"5xl"}>
                <Flex alignItems={"center"} justify={"space-around"}>
                    <Flex alignItems={"center"} gap={6}>
                        <Link to="/" as={RouterLink} style={{ textDecoration: "none" }} fontSize={"26px"} fontWeight={"semibold"}>
                            Blog Application
                        </Link>
                        <Flex alignItems={"center"} gap={4}>
                            <Link to={`/${username}/posts`} fontSize={"17px"} style={{ textDecoration: "none" }} as={RouterLink}>Your Posts</Link>
                            <Link to={`/${username}/liked-posts`} fontSize={"17px"} style={{ textDecoration: "none" }} as={RouterLink}>Liked Posts</Link>
                        </Flex>
                    </Flex>
                    <Flex alignItems={"center"} gap={4}>
                        <Button onClick={onOpen} colorScheme="blue" variant={"solid"}>
                            Add Post
                        </Button>
                        <PostModal isOpen={isOpen} onClose={onClose}/>
                        <Menu>
                            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} bg={"transparent"} _hover={{ bg: "transparent" }}>
                                <Avatar size={"sm"}/>   
                            </MenuButton>
                            <MenuList>
                                <MenuItem as={Button} onClick={handleLogout} isLoading={loading}>
                                    Logout
                                </MenuItem>
                                <MenuItem>Edit Profile</MenuItem>
                            </MenuList>
                        </Menu>
                        <Button onClick={toggleColorMode} bg={"transparent"}>
                            {colorMode === "light" ? <FaMoon fontSize={22} /> : <FaSun fontSize={18} />}
                        </Button>
                    </Flex>
                </Flex>

            </Container>
        </Box>
    )
}

export default Header