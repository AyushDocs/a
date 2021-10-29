import React from 'react'
//const minimum_words:number=0
//const maximum_words:number=20
export default function publication_item(props) {
  return (
  <>
    <div className="blog-item my-2 mx-2">
    <h4 className="mx-3">{props.heading.toUpperCase()}</h4>
    <h4 className="mx-3">{props.id}</h4>
    <h4 className="mx-3">{props.author}</h4>
    <h4 className="mx-3">{props.link}</h4>
    {/* <p className="mx-3">{props.text.slice(minimum_words,maximum_words)}</p> */}
  </div>
  <hr />
  </>
  )
}
