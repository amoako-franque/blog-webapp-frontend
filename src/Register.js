import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"
import Navbar from "./Navbar"

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  })

  const { username, email, password } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!username || !email || !password) {
      toast.warn("Please all fields are required")
      return
    }

    try {
      const response = await axios.post(
        "https://blogwebapp-api.onrender.com",
        formData
      )
      if (response.data.success) {
        //console.log(response.data)
        toast.success(response.data.message)
        navigate("/login")
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center mx-96">
        <div className="mx-auto my-36 flex h-[350px] w-[350px] flex-col border-2 bg-white text-black shadow-xl">
          <div className="flex flex-row justify-start mx-8 mb-1 space-x-2 mt-7">
            <div className="h-7 w-3 bg-[#56727c]" />
            <div className="w-3 font-sans text-xl font-bold text-center">
              <h1>Register</h1>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center">
              <input
                className="p-2 my-2 border-b-4 rounded-md border-slate-500 w-72"
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={onChange}
              />{" "}
              <input
                className="p-2 my-2 border-b-4 rounded-md border-slate-500 w-72"
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={onChange}
              />
              <input
                className="p-2 my-2 border-b-4 rounded-md border-slate-500 w-72"
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={onChange}
                minLength="6"
              />{" "}
            </div>
            <div className="flex justify-center my-2">
              <button className="p-2 font-sans border rounded-md hover:text-lime-200 hover:bg-black hover:cursor-pointer w-72 siteHeader">
                Register
              </button>
            </div>
          </form>
          <div className="flex justify-end my-3 text-sm font-semibold mx-7">
            <div>
              <Link
                to="/login"
                className="text-lg font-semibold text-gray-600 underline hover:cursor-pointer underline-offset-2"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
