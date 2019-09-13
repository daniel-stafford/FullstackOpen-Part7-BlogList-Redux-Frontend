import React from 'react'
import { Header } from 'semantic-ui-react'

const User = props => {
  console.log('individual user props', props)
  if (props.user === undefined) {
    return null
  }

  return (
    <div>
      <Header as='h2'>{props.user.name}</Header>
      <Header as='h3'>added blogs</Header>
      <ul>
        {props.user.blogs.map(b => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
