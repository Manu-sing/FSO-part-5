import React from 'react'
const Blog = ({ blog }) => (
  <>
    <h3>{blog.title}</h3>
    <div>{blog.author}</div>
  </>
)

export default Blog