import { Routes, Route } from "react-router-dom"
import AuthPage from "./pages/AuthPage"
import HomePage from "./pages/HomePage"
import YourPostsPage from "./pages/YourPostsPage"
import YourLikedPostsPage from "./pages/YourLikedPostsPage"
import PageLayout from "./components/layouts/PageLayout"

const App = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<HomePage />}/>
          <Route path=":username/posts" element={<YourPostsPage />}/>
          <Route path=":username/liked-posts" element={<YourLikedPostsPage />}/>
        </Route>
        <Route path="/auth" element={<AuthPage />}/>
        <Route />
      </Routes>
    </>
  )
}

export default App
