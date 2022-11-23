import React, { useEffect, useState } from "react"

import axios from "axios"
import { useParams } from "react-router-dom"
import Navbar from "./Navbar"
import UserNavbar from "./UserNavBar"

const Post = () => {
  const { slug } = useParams()

  const [post, setPost] = useState([])

  const [user, setUser] = useState({})

  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem("token")
      if (token) {
        const response = await axios.get(
          "https://blogwebapp-api.onrender.com",

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        setUser(response.data.data)
      }
    }
    getUser()
  }, [])

  useEffect(() => {
    const fetchPost = async () => {
      try {
        let response = await axios.get(
          `https://blogwebapp-api.onrender.com/${slug}`
        )
        setPost(response.data.post)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPost()
  }, [])

  return (
    <>
      {user?.username ? <UserNavbar user={user} /> : <Navbar />}{" "}
      <li
        aria-label="card-item-v2"
        className="flex  bg-gray-400 mt-36 mx-96 flex-col mb-8   hover:shadow-md leading-relaxed  w-[900px] p-7  shadow-md rounded-lg"
      >
        <div className="relative mb-6 flex-shrink-0  h-[550px]">
          <p className="p-2 mb-3 text-xl font-bold text-teal-400 bg-gray-900 ">
            {post.title}
          </p>
          <p className="pl-3 text-lg"> {post.body}</p>
        </div>
        <div className="flex items-center justify-between flex-1 gap-x-5">
          <div className="flex flex-col">
            <div className="mb-3 font-bold text-gray-800 text-md">
              <span className="pr-4">Author: {post?.postedBy?.username}</span>
              <br />
              <span>Posted on: {post.createdAt}</span>
            </div>
          </div>
        </div>
      </li>
    </>
  )
}

export default Post
