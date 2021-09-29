import React from 'react'
import '../../css/publication_item.css'
const minimum_words=0
const maximum_words=20
export default function publication_item(props) {
  return (
  <>
    <div className="blog-item my-2 mx-2">
    <h4 className="mx-3">{props.heading.toUpperCase()}</h4>
    <p className="mx-3">{props.text.slice(minimum_words,maximum_words)}</p>
  </div>
  <hr />
  </>
  )
}
