import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

const Blog = ({ blog }) => {
  return (
    <Table.Row>
      <Table.Cell>
        <Link to={`/blogs/${blog.id}`}> {blog.title} </Link>
        {blog.author}
      </Table.Cell>
    </Table.Row>
  )
}

const mapStateToProps = state => {
  return { user: state.user }
}

export default connect(mapStateToProps)(Blog)

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}
