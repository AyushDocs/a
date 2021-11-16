import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import useInput from '../hooks/useInput';

const EditPublications:React.FC = () => {
    const state=useLocation().state;
    const[name,NameBind]=useInput(state.name);
    const[description,DescBind]=useInput(state.description);
    const[link,LinkBind]=useInput(state.link);
    const[imageUrl,ImgUrlBind]=useInput(state.imageUrl);
    const[author,AuthoursBind]=useInput(state.author);
    
    const navigate=useNavigate();
    const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const body=JSON.stringify({name,description,link,imageUrl,author})
    const options={body,method:'POST',headers:{'Content-Type':'application/json'}}
    const res=await fetch('http://localhost:8080/api/publications/',options)
    const data=await res.json();
    console.log(data);
    }
    return (
        <form className="container my-3" onSubmit={handleSubmit}>
            <input className="form-control mb-3 py-3" placeholder="Enter name of Publication" required name="name"{...NameBind} />
            <input className="form-control mb-3 py-3" placeholder="Enter description of Publication" required name="description"{...DescBind} />
            <input className="form-control mb-3 py-3" placeholder="Enter url of Publication" type="url" required name="link" {...LinkBind}/>
            <input className="form-control mb-3 py-3" placeholder="Enter url of Publication image" type="url" required name="imageUrl" {...ImgUrlBind}/>
            <input className="form-control mb-3 py-3" placeholder="Enter name of authours seperated by ," required name="author"{...AuthoursBind}/>
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-primary">Submit</button>
              <button onClick={()=>navigate(-1)} className="btn btn-danger">Back</button>
            </div>
        </form>
    )
}
export default EditPublications
