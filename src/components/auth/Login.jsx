import { Alert, AlertIcon, Button, Input, Text } from "@chakra-ui/react"
import { useContext, useState } from "react"
import { LoginContext } from "../../context/LoginContext"

const Login = () => {
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    })
    const { handleLogin, error, loading } = useContext(LoginContext)

    return (
        <>
            <Text fontSize={"22px"} mb={3}>Log In</Text>
            <Input size={"md"} value={inputs.email} onChange={(e) => setInputs({...inputs, email: e.target.value})} mb={2} type="email" cursor={"pointer"} placeholder="Email Address"/>
            <Input size={"md"} value={inputs.password} onChange={(e) => setInputs({...inputs, password: e.target.value})} mb={2} type="password" cursor={"pointer"} placeholder="Password"/>
            {error && 
                <Alert my={2} status='error'>
                    <AlertIcon />
                    {error.message}
                </Alert>
            }
            <Button onClick={() => handleLogin(inputs)} isLoading={loading} colorScheme="blue" w={"full"} mb={1}>Log In</Button>
        </>
    )
}

export default Login