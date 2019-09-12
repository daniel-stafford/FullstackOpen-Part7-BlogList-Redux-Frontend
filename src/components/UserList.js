import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'
import UserTable from './UserTable'

/* eslint-disable */
const UserList = props => {
  useEffect(() => {
    props.initializeUsers()
  }, [])
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {props.users.map(user => {
            return <UserTable user={user} key={user.id} />
          })}
        </tbody>
      </table>
    </div>
  )
}
/* eslint-enable */

const mapStateToProps = state => {
  return {
    users: state.users
  }
}
const mapDispatchToProps = {
  initializeUsers
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList)
