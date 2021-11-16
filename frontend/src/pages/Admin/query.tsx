import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AlertContext } from "../../context/AlertContext";

export default function FullScreenQuery() {
  const navigate = useNavigate();
  const Data = useLocation().state;
  const { setShowCheck,setText,setOnComplete,setTimeToDisappear,setUndo} = useContext(AlertContext)  
  const deleteQuery =async () => {
    setUndo(false)
    setText('Deleted Query')
    setTimeToDisappear(6000)
    setOnComplete(() =>()=>fetch(`http://localhost:8080/api/query/${Data.id}`, {method: "DELETE"}))
    setShowCheck(true);
    navigate("/admin/")
  }
  return (
  <div className="container my-2 form-container form-floating ">
    <input readOnly value={Data.email} className="my-3 form-control" type="email"/>
    <textarea readOnly className="my-4 form-control" value={Data.query}style={{ height: 100 }}></textarea>
    <input readOnly className="my-3 form-control" value={Data.id} />
    <input readOnly className="my-3 form-control" value={Data.date}/>
    <div className="d-flex justify-content-between">
      <Link to="/admin/" className="btn btn-primary">Back</Link>
      <button onClick={deleteQuery} className="btn btn-danger">Delete</button>
    </div>
  </div>
  );
}
