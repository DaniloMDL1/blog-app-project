import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import { BrowserRouter } from 'react-router-dom'
import { SignUpProvider } from './context/SignUpContext.jsx'
import { LogoutProvider } from './context/LogoutContext.jsx'
import { LoginProvider } from './context/LoginContext.jsx'
import { CreatePostProvider } from './context/CreatePostContext.jsx'
import { PostLikesProvider } from './context/PostLikesContext.jsx'
import { DeletePostProvider } from './context/DeletePostContext.jsx'
import { CreateCommentProvider } from './context/CreateCommentContext.jsx'

const styles = {
  global: (props) => ({
    body: {
      bg: mode("white", "gray.800")(props),
      color: mode("#000", "white")(props)
    }
  })
}

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({ config, styles })

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> 
    <CreateCommentProvider>
      <DeletePostProvider>
        <PostLikesProvider>
          <CreatePostProvider>
            <LoginProvider>
              <LogoutProvider>
                <SignUpProvider> 
                  <BrowserRouter>
                    <ChakraProvider theme={theme}>
                      <App />
                    </ChakraProvider>
                  </BrowserRouter>
                </SignUpProvider>
              </LogoutProvider>
            </LoginProvider>
          </CreatePostProvider>
        </PostLikesProvider>
      </DeletePostProvider>
    </CreateCommentProvider>
  </React.StrictMode>
)
