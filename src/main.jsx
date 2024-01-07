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
  </React.StrictMode>
)
