import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PublicationType } from '../enums/PublicationType'
const minimum_words:number=0
const maximum_words:number=20
export interface Props{
    id:number,name:string,author:string,description:string,link:string,imgUrl:string,type:PublicationType
}
const PublicationItem = (props:React.PropsWithChildren<Props>) => {
  const {id,name,author,description,link,imgUrl,type} =props ;
  const state={id,name,author,description,link,imgUrl,type}
  const navigate=useNavigate()
    return (<div className="card my-2">
        <img src={imgUrl} className="card-img-top" alt=""/>
        <div className="card-body">
          <h4 className="card-title">{name}</h4>
          <p className="card-text">{description.substr(minimum_words,maximum_words)}</p>
         {type===PublicationType.GET && <a href={link} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">Read More</a>}
         {type===PublicationType.ADD && <button onClick={()=>navigate('/admin/publication')} className="btn btn-primary btn-sm">Read More</button>}
         {type===PublicationType.UPDATE && <button onClick={()=>navigate('/admin/publication',{state})} className="btn btn-primary btn-sm">Read More</button>}
        </div>
      </div>)
}

export default PublicationItem
