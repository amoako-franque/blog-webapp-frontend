import React from "react"
import { AiFillCodepenCircle, AiFillBuild } from "react-icons/ai"
import { Link, NavLink, useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"

const UserNavbar = ({ user }) => {
  let navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const res = await axios.post("https://blogwebapp-api.onrender.com")
      if (res.data.success) {
        localStorage.clear()
        toast.success(res.data.message)
        navigate("/login")
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="top-0 flex items-center justify-between w-full p-10 tracking-wide siteHeader h-14">
      <div className="flex items-center ">
        <div className="text-4xl bold text- p-14 hover:cursor-pointer">
          <AiFillCodepenCircle />
        </div>
        <div>
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "greenyellow" : "white",
            })}
            className="p-4 ml-4 hover:text-lime-200 hover:cursor-pointer"
            to="/"
          >
            <span>
              {" "}
              <AiFillBuild />{" "}
            </span>
            Home
          </NavLink>
        </div>
      </div>
      {user ? (
        <div>
          <span className="mr-4 hover:text-lime-200">{user.username}</span>
          <Link
            to="/login"
            onClick={handleLogout}
            className="hover:text-lime-200 hover:cursor-pointer mr-28"
          >
            Logout
          </Link>
        </div>
      ) : (
        <div className="flex justify-between">
          <Link
            to="/login"
            className="pr-4 hover:cursor-pointer hover:text-lime-200"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="mr-28 hover:cursor-pointer hover:text-lime-200"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  )
}

export default UserNavbar
