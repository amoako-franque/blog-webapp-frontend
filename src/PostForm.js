import React, { useEffect, useRef, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

const PostForm = () => {
  const refreshPage = () => {
    window.location.reload()
  }
  const userRef = useRef()
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")

  useEffect(() => {
    userRef.current.focus()
  }, [])

  const handleTitleInput = (e) => setTitle(e.target.value)
  const handleBodyInput = (e) => setBody(e.target.value)

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
        .post(
          "https://blog-web-api-onrender.com",
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
          console.log(response)
          toast.success(response.data.message, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          })
          setTitle("")
          setBody("")
          refreshPage()
        })
        .catch(function (error) {
          console.log(error)
        })
    } catch (error) {
      toast.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-6">
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

        <textarea
          name="body"
          id="body"
          value={body}
          onChange={handleBodyInput}
          className="w-[600px] p-4 bg-slate-50  border border-gray-800 rounded-lg outline-none resize-none min-h-[250px]"
          placeholder="Whats on your mind ..."
        />
        <div className="flex">
          {" "}
          <button
            className="w-20 h-8 mt-3 font-semibold rounded-lg hover:shadow-md bg-orange-4 siteHeader hover:bg-lime-900"
            type="submit"
          >
            Send
          </button>
        </div>
      </div>
    </form>
  )
}

export default PostForm
