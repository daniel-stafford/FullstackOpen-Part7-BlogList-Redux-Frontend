import React from 'react'

const Comment = props => {
  const comment = props.comment.comment
  if (props.comment === undefined) return null
  return <>{comment}</>
}

export default Comment
