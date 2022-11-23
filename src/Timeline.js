import React from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"

const Timeline = ({ posts, user }) => {
  const token = localStorage.getItem("token")

  const refreshPage = () => {
    window.location.reload()
  }


  const handleDelete = async (slg) => {
    try {
      await axios.delete(`https://blog-web-api-onrender.com/${slg}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      toast.success("Post deleted")
      refreshPage()
    } catch (err) {
      return console.log(err)
    }
  }
  return (
    <ul>
      {posts.map((post) => (
        <li
          key={post.id}
          aria-label="card-item-v2"
          className="flex mt-4 bg-slate-300 flex-col mb-8  hover:cursor-pointer hover:shadow-md hover:bg-slate-600 hover:text-gray-300 leading-relaxed  w-[900px] p-7  shadow-md rounded-lg"
        >
          <Link to={`/post/${post.slug}`}>
            <div className="relative mb-6 flex-grow  h-[450px]">
              <p className="pb-4 text-xl font-bold text-teal-600">
                {post.title} <br />
              </p>

              <p className="pl-3 text-lg"> {post.body}</p>
            </div>
            <div className="flex items-center justify-between flex-1 gap-x-5">
              <div className="flex flex-col">
                <span className="mb-3 font-bold text-gray-400 hover:text-orange-300 text-md">
                  <span className="pr-4">Author: {post.postedBy.username}</span>
                  <br />
                  <span>Posted on: {post.createdAt}</span>
                </span>
              </div>
              {user._id === post.postedBy._id && (
                <div>
                  <Link
                    to={`/user/post/${post.slug}`}
                    className="mb-3 font-bold text-gray-800 text-md"
                  >
                    <span className="pr-4 text-lg font-extrabold hover:text-[#faebd7] ">
                      Update
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </Link>
          {user._id === post.postedBy._id && (
            <span
              onClick={() => handleDelete(post.slug)}
              className="flex justify-end p-6 text-lg font-extrabold text-red-700 hover:shadow-md hover:text-slate-100 hover:cursor-pointer"
            >
              Delete
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}

export default Timeline
