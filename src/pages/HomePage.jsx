import { Box, Container } from "@chakra-ui/react"
import Posts from "../components/post/Posts"

const HomePage = () => {
  return (
    <Box pt={"90px"} maxW={"4xl"}>
      <Container w={"full"}>
          <Posts />
      </Container>
    </Box>
  )
}

export default HomePage