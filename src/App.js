import { useEffect, useState } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Home from "./Home"
import Login from "./Login"
import Post from "./Post"
import Register from "./Register"
import UpdatePost from "./UpdatePost"
import axios from "axios"

function App() {
	const [user, setUser] = useState({})
	const navigate = useNavigate()

	const token = localStorage.getItem("token")

	useEffect(() => {
		const getUser = async () => {
			if (!token) {
				navigate("/login")
			}
			if (token) {
				const response = await axios.get(
					"/api/v1/get-user-by-id",

					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				)
				//console.log(response.data.data)
				setUser(response.data.data)
			}
		}
		getUser()
	}, [token])
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
				<Route path="/" element={user ? <Home /> : <Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/post/:slug" element={<Post />} />
				<Route path="/user/post/:slug" element={<UpdatePost />} />
			</Routes>
		</div>
	)
}

export default App
