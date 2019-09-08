import React from 'react'
import '../index.css'

const Notification = ({ notification }) => {
  if (notification.message === null) {
    return null
  }
  if (notification.type === 'error')
    return <div className='error'>{notification.message}</div>

  if (notification.type === 'success')
    return <div className='success'>{notification.message}</div>
}

export default Notification
