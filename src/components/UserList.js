import React from 'react'
import { connect } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'
import UserTable from './UserTable'
import { Header } from 'semantic-ui-react'

/* eslint-disable */
const UserList = props => {
  return (
    <div>
      <Header as='h2'>Users</Header>
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
