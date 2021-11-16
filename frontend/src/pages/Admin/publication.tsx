import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Button } from 'reactstrap';
import { PublicationType } from '../../enums/PublicationType';
import useInput from '../../hooks/useInput';
import { useAppDispatch } from '../../redux/reducerHooks';
import { setAll } from '../../redux/slices/AlertSlice';

const Publication:React.FC = () => {
    const state=useLocation().state||null
    console.log(state);
    
    const[name,NameBind,NameReset]=useInput(state?.name||'');
    const[description,DescBind,DescReset]=useInput(state?.description||'');
    const[link,LinkBind,LinkReset]=useInput(state?.link||'');
    const[imgUrl,ImgUrlBind,ImgUrlReset]=useInput(state?.imgUrl||'');
    const[author,AuthoursBind,AuthoursReset]=useInput(state?.author||'');
    const navigate=useNavigate();
    const dispatch=useAppDispatch();
    const resetAll=()=>{
    NameReset()
    DescReset()
    LinkReset()
    ImgUrlReset()
    AuthoursReset()
    }
    const handleSubmit=async(e:React.MouseEvent<HTMLButtonElement>)=>{
    const body=JSON.stringify({name,description,link,imgUrl,author})
    const options={body,method:state?.type===PublicationType.ADD?'POST':'PUT',headers:{'Content-Type':'application/json'}}
    try {
      const res=await fetch('http://localhost:8080/api/publications/',options)
      const data=await res.json(); 
      if(data.errorMessage) {
        dispatch(setAll({showAlert:true,message:data.errorMessage,Stage:'danger'}));
        return;
      }
      dispatch(setAll({showAlert:true,message:'Success',Stage:'success'}))
      resetAll()
      navigate(-1)
    } catch (error) {
      dispatch(setAll({showAlert:true,message:'Weak internet connection',Stage:'danger'}))
      console.log(error)
      navigate(-1)
    }
    }
    const handleDelete=async(e:React.MouseEvent<HTMLButtonElement>)=>{
    try {
      const options={method:'delete'}
      const res=await fetch(`http://localhost:8080/api/publications/${name}`,options)
      if(!res.ok)return dispatch(setAll({showAlert:true,message:'failed to delete',Stage:'danger'}))
      dispatch(setAll({showAlert:true,message:'deleted successfully',Stage:'success'})) 
      navigate(-1)
    } catch (error) {
      dispatch(setAll({showAlert:true,message:'Weak internet connection',Stage:'danger'}))
      console.log(error,error.message);
    }
    }
    return (<div className="container my-3">
        <input className="form-control mb-3 py-3" value={name} required placeholder="Enter name of Publication"  name="name"{...NameBind} />
        <input className="form-control mb-3 py-3" value={description} required placeholder="Enter description of Publication"  name="description"{...DescBind} />
        <input className="form-control mb-3 py-3" value={link} required placeholder="Enter url of Publication" type="url"  name="link" {...LinkBind}/>
        <input className="form-control mb-3 py-3" value={imgUrl} required placeholder="Enter url of Publication image" type="url"  name="imageUrl" {...ImgUrlBind}/>
        <input className="form-control mb-3 py-3" value={author} required placeholder="Enter name of authours seperated by ,"  name="author"{...AuthoursBind}/>
        <div className="d-flex justify-content-between">
          <span>
             <Button color="primary" className="mr-2" onClick={handleSubmit}>Done</Button>
             <Button color="danger" className="mx-2" onClick={handleDelete}>Delete</Button>
          </span>
          <Button color="secondary" onClick={()=>navigate(-1)}>Back</Button>
        </div>
    </div>)
}
export default Publication