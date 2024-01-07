import { Alert, AlertIcon, Button, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react"
import { useContext, useState } from "react"
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { SignUpContext } from "../../context/SignUpContext"

const SignUp = () => {
    const { handleSignUp, error, loading } = useContext(SignUpContext)

    const [inputs, setInputs] = useState({
        fullName: "",
        username: "",
        email: "",
        password: ""
    })
    const [showPassword, setShowPassword] = useState(false)

    return (
        <>
            <Text fontSize={"22px"} mb={3}>Create Account</Text>
            <Input size={"md"} value={inputs.fullName} onChange={(e) => setInputs({...inputs, fullName: e.target.value})} mb={2} type="text" cursor={"pointer"} placeholder="Full Name"/>
            <Input size={"md"} value={inputs.username} onChange={(e) => setInputs({...inputs, username: e.target.value})} mb={2} type="text" cursor={"pointer"} placeholder="Username"/>
            <Input size={"md"} value={inputs.email} onChange={(e) => setInputs({...inputs, email: e.target.value})} mb={2} type="email" cursor={"pointer"} placeholder="Email Address"/>
            <InputGroup>
                <Input size={"md"} border={"1px solid"} borderColor={"gray.400"} value={inputs.password} onChange={(e) => setInputs({...inputs, password: e.target.value})} mb={2} type={showPassword ? "text" : "password"} cursor={"pointer"} placeholder="Password"/>
                <InputRightElement>
                    <Button onClick={() => setShowPassword(!showPassword)} bg={"transparent"} size={"md"}>
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                </InputRightElement>
            </InputGroup>
            {error && 
                <Alert my={2} status='error'>
                    <AlertIcon />
                    {error.message}
                </Alert>
            }
            <Button onClick={() => handleSignUp(inputs)} isLoading={loading} colorScheme="blue" w={"full"} mb={1}>Sign Up</Button>
        </>
    )
}

export default SignUp