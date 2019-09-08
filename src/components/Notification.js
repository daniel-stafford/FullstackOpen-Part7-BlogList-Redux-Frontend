import React from 'react'
import '../index.css'
import { connect } from 'react-redux'

const Notification = ({ notification }) => {
  if (notification.category === 'hide') {
    return null
  }
  if (notification.category === 'error')
    return <div className='error'>{notification.content}</div>

  if (notification.category === 'success')
    return <div className='success'>{notification.content}</div>
}
const mapStateToProps = state => {
  return { notification: state.notification }
}

export default connect(mapStateToProps)(Notification)
