import React from 'react'
import { Link } from 'react-router-dom'
const UserTable = ({ user }) => {
  return (
    <tr>
      <td>
        <Link to={`/users/${user.id}`}>{user.username}</Link>
      </td>
      <td>{user.blogs.length}</td>
    </tr>
  )
}

export default UserTable
