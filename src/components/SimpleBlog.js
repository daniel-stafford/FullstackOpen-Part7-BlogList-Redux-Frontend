import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div className ='blog'>
    <div className="mainBlog">
      {blog.title} {blog.author}
    </div>
    <div className="expandedBlog"> 
      blog has {blog.likes} likes
      <button className="likeButton" onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog
