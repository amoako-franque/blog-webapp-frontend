import React, { useEffect, useRef, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate, useParams } from "react-router-dom"
import UserNavbar from "./UserNavBar"

const UpdatePost = () => {
  const { slug } = useParams()

  const navigate = useNavigate()

  const userRef = useRef()

  const [title, setTitle] = useState("")
  const [user, setUser] = useState("")
  const [body, setBody] = useState("")

  useEffect(() => {
    userRef.current.focus()
  }, [])

  const handleTitleInput = (e) => setTitle(e.target.value)

  const handleBodyInput = (e) => setBody(e.target.value)

  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem("token")

      if (token) {
        const response = await axios.get(
          "https://blog-web-api-onrender.com",

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        console.log(response.data.data)
        setUser(response.data.data)
      }
    }
    getUser()
  }, [])
  console.log(user)
  useEffect(() => {
    const fetchPost = async () => {
      try {
        let response = await axios.get(
          `https://blog-web-api-onrender.com/${slug}`
        )
        console.log(response.data)
        setTitle(response.data.post.title)
        setBody(response.data.post.body)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPost()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title || !body) {
      toast.error("Please fill the title and body")
      return
    }
    const token = localStorage.getItem("token")
    if (!token) {
      toast.error("Sign in ")
      return
    }

    //console.log({token})
    try {
      axios
        .put(
          `https://blog-web-api-onrender.com/${slug}`,
          {
            title,
            body,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          //console.log(response)
          toast.success("Post updated", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          })
          navigate("/")
        })
        .catch(function (error) {
          console.log(error)
        })
    } catch (error) {
      toast.error(error)
    }
  }

  return (
    <>
      <UserNavbar user={user} />
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mt-6 mx-96">
          <label className="flex flex-row" htmlFor="title">
            <span className="p-4 text-xl font-bold text-gray-400 w-28">
              Title:{" "}
            </span>
            <span>
              <input
                type="text"
                className="w-[600px] p-4 bg-slate-50 mb-3  border border-gray-800 rounded-lg outline-none resize-none min-h-[50px]"
                placeholder="Enter post title"
                name="title"
                ref={userRef}
                id="title"
                value={title}
                onChange={handleTitleInput}
              />
            </span>
          </label>

          <label htmlFor="body">
            <span className="text-xl font-bold text-gray-400 ">Body: </span>
            <span>
              <textarea
                name="body"
                id="body"
                value={body}
                onChange={handleBodyInput}
                className="w-[700px] mt-3 p-4 bg-slate-50  border border-gray-800 rounded-lg outline-none   min-h-[550px]"
                placeholder="Whats on your mind ..."
              />
            </span>
          </label>

          <div className="flex">
            {" "}
            <button
              className="w-20 h-8 mt-3 font-semibold rounded-lg hover:shadow-md bg-orange-4 siteHeader hover:bg-lime-900"
              type="submit"
            >
              Update Post
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default UpdatePost
