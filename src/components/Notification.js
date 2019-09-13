import React from 'react'
import '../index.css'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'

const Notification = ({ notification }) => {
  if (notification.category === 'hide') {
    return null
  }
  if (notification.category === 'error')
    return <Message error>{notification.content}</Message>

  if (notification.category === 'success')
    return <Message success>{notification.content}</Message>
}
const mapStateToProps = state => {
  return { notification: state.notification }
}

export default connect(mapStateToProps)(Notification)
