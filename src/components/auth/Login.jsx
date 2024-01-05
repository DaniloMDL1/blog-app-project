import { Button, Input, Text } from "@chakra-ui/react"
import { useState } from "react"

const Login = () => {
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    })

    return (
        <>
            <Text fontSize={"22px"} mb={3}>Log In</Text>
            <Input size={"md"} value={inputs.email} onChange={(e) => setInputs({...inputs, email: e.target.value})} mb={2} type="email" cursor={"pointer"} placeholder="Email Address"/>
            <Input size={"md"} value={inputs.password} onChange={(e) => setInputs({...inputs, password: e.target.value})} mb={2} type="password" cursor={"pointer"} placeholder="Password"/>
            <Button colorScheme="blue" w={"full"} mb={1}>Log In</Button>
        </>
    )
}

export default Login