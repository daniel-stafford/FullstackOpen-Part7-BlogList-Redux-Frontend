import React from 'react'

const DetailedBlog = props => {
  console.log('individual detailedBlog props', props)
  if (props.blog === undefined) {
    return null
  }

  return (
    <div>
      <h2>{props.blog.title}</h2>
      <p>{props.blog.url}</p>
      <p>
        {props.blog.likes} likes
        <button onClick={() => props.handleLike(props.blog)}>Like</button>
      </p>
      <p>Added by {props.blog.user.name}</p>
      {/* {user.username === blog.user.username && (
      //   <button onClick={() => handleRemove({ blog })}>Remove</button>
      // </div> */}
    </div>
  )
}

export default DetailedBlog
