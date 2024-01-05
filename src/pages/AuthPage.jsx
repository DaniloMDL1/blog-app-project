import { Container, Flex, Text } from "@chakra-ui/react"
import SignUp from "../components/auth/SignUp"
import Login from "../components/auth/Login"
import { useState } from "react"

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <Flex h={"100vh"} justifyContent={"center"} alignItems={"center"}>
      <Container maxW={"sm"} py={2} border={"1px solid"} borderColor={"gray.400"} borderRadius={"xl"}>
        <Text textAlign={"center"} mb={3} fontSize={"30px"} fontWeight={"semibold"}>
          Blog Application
        </Text>
        {isLogin ? <Login /> : <SignUp />}
        <Text>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <Text onClick={() => setIsLogin(!isLogin)} as={"span"} ml={2} color={"blue.500"} cursor={"pointer"}>
            {isLogin ? "Sign Up" : "Log In"}
          </Text>
        </Text>
      </Container>
    </Flex>
  )
}

export default AuthPage