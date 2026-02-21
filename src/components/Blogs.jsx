import React from 'react'
import BlogList from './blogs/BlogList'

export default function Blogs() {
  return (
    <div>
      <BlogList limit={20}  />
      
    </div>
  )
}
