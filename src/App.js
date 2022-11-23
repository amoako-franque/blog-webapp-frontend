import { Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Home from "./Home"
import Login from "./Login"
import Post from "./Post"
import Register from "./Register"
import UpdatePost from "./UpdatePost"

function App() {
  const user = localStorage.getItem("user")
  user && console.log(user)

  return (
    <div className="">
      <ToastContainer
        reverseOrder={false}
        position="top-center"
        autoClose={1000}
        limit={1}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post/:slug" element={<Post />} />
        <Route path="/user/post/:slug" element={<UpdatePost />} />
      </Routes>
    </div>
  )
}

export default App
