import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import { HashRouter } from 'react-router-dom'
import { SignUpProvider } from './context/SignUpContext.jsx'
import { LogoutProvider } from './context/LogoutContext.jsx'
import { LoginProvider } from './context/LoginContext.jsx'
import { CreatePostProvider } from './context/CreatePostContext.jsx'
import { PostLikesProvider } from './context/PostLikesContext.jsx'
import { DeletePostProvider } from './context/DeletePostContext.jsx'
import { CreateCommentProvider } from './context/CreateCommentContext.jsx'
import { EditProfileProvider } from './context/EditProfileContext.jsx'

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
    <EditProfileProvider>
      <CreateCommentProvider>
        <DeletePostProvider>
          <PostLikesProvider>
            <CreatePostProvider>
              <LoginProvider>
                <LogoutProvider>
                  <SignUpProvider> 
                    <HashRouter>
                      <ChakraProvider theme={theme}>
                        <App />
                      </ChakraProvider>
                    </HashRouter>
                  </SignUpProvider>
                </LogoutProvider>
              </LoginProvider>
            </CreatePostProvider>
          </PostLikesProvider>
        </DeletePostProvider>
      </CreateCommentProvider>
    </EditProfileProvider>
  </React.StrictMode>
)
