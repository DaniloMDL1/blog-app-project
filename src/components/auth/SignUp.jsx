import { Button, Input, Text } from "@chakra-ui/react"
import { useState } from "react"

const SignUp = () => {
    const [inputs, setInputs] = useState({
        fullName: "",
        username: "",
        email: "",
        password: ""
    })

    return (
        <>
            <Text fontSize={"22px"} mb={3}>Create Account</Text>
            <Input size={"md"} value={inputs.fullName} onChange={(e) => setInputs({...inputs, fullName: e.target.value})} mb={2} type="text" cursor={"pointer"} placeholder="Full Name"/>
            <Input size={"md"} value={inputs.username} onChange={(e) => setInputs({...inputs, username: e.target.value})} mb={2} type="text" cursor={"pointer"} placeholder="Username"/>
            <Input size={"md"} value={inputs.email} onChange={(e) => setInputs({...inputs, email: e.target.value})} mb={2} type="email" cursor={"pointer"} placeholder="Email Address"/>
            <Input size={"md"} value={inputs.password} onChange={(e) => setInputs({...inputs, password: e.target.value})} mb={2} type="password" cursor={"pointer"} placeholder="Password"/>
            <Button colorScheme="blue" w={"full"} mb={1}>Sign Up</Button>
        </>
    )
}

export default SignUp