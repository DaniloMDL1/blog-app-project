import { Routes, Route, Navigate } from "react-router-dom"
import AuthPage from "./pages/AuthPage"
import HomePage from "./pages/HomePage"
import YourPostsPage from "./pages/YourPostsPage"
import YourLikedPostsPage from "./pages/YourLikedPostsPage"
import PageLayout from "./components/layout/PageLayout"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "./config/firebase"

const App = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <>
      <Routes>
        <Route path="/" element={user ? <PageLayout /> : <Navigate to={"/auth"}/>}>
          <Route index element={<HomePage />}/>
          <Route path=":username/posts" element={<YourPostsPage />}/>
          <Route path=":username/liked-posts" element={<YourLikedPostsPage />}/>
        </Route>
        <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to={"/"}/>}/>
        <Route />
      </Routes>
    </>
  )
}

export default App
