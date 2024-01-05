import { Avatar, Box, Button, Container, Flex, Link, useColorMode } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <Box position={"fixed"} py={4} top={0} right={0} left={0} h={"80px"} borderBottom={"1px solid gray"}>
            <Container maxW={"5xl"}>
                <Flex alignItems={"center"} justify={"space-around"}>
                    <Flex alignItems={"center"} gap={4}>
                        <Link to="/" as={RouterLink} style={{ textDecoration: "none" }} fontSize={"26px"} fontWeight={"semibold"}>
                            Blog Application
                        </Link>
                        <Flex alignItems={"center"} gap={4}>
                            <Link to="/dadsada/posts" fontSize={"17px"} style={{ textDecoration: "none" }} as={RouterLink}>Your Posts</Link>
                            <Link to="/dadsada/liked-posts" fontSize={"17px"} style={{ textDecoration: "none" }} as={RouterLink}>Liked Posts</Link>
                        </Flex>
                    </Flex>
                    <Flex alignItems={"center"} gap={4}>
                        <Avatar size={"md"}/>
                        <Button onClick={toggleColorMode} bg={"transparent"}>
                            {colorMode === "light" ? <MoonIcon w={5} h={5}/> : <SunIcon w={5} h={5}/>}
                        </Button>
                    </Flex>
                </Flex>

            </Container>
        </Box>
    )
}

export default Header