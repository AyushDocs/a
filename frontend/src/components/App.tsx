import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Alert } from "reactstrap";
import ProtectedRoute from "../Authentication/ProtectedAdminRoute";
import AlertState from "../context/AlertContext";
import "../css/App.css";
import { PublicationType } from "../enums/PublicationType";
import About from "../pages/About";
import AdminLogin from "../pages/Admin/login";
import AddPublication from "../pages/Admin/publication";
import AdminPublications from "../pages/Admin/publications";
import AdminFull from "../pages/Admin/query";
import Admin from "../pages/Admin/_";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Publications from "../pages/Publication";
import Signup from "../pages/Signup";
import { useAppDispatch, useAppSelector } from "../redux/reducerHooks";
import { unsetAll } from "../redux/slices/AlertSlice";
import Check from "./Check";
import Footer from "./Footer";
import Navbar from "./Navbar";
export default function App() {
  const{Stage,showAlert,message}=useAppSelector(state=>state.Alert)
  const dispatch=useAppDispatch();
  const onClose=()=>dispatch(unsetAll())
  useEffect(()=>{
  let id: NodeJS.Timeout;
  if(showAlert) id= setTimeout(()=>dispatch(unsetAll()),6000)
  else clearTimeout(id)
  return()=>clearTimeout(id)
  },[dispatch, showAlert])
  return (
    <AlertState>
    <div className="App">
    <Alert color={Stage} isOpen={showAlert} className="my-0">
      <div className="d-flex justify-content-between">
        <span className="alert-text">{message}</span>
        <button className={`close btn btn-${Stage} btn-sm`} data-dismiss="alert" aria-label="Close" onClick={onClose}>
         <span aria-hidden="true">X</span>
        </button>
      </div>
    </Alert>
      <Navbar />
      <Check/>
      <div className="body">
        <Routes>
          <Route path="/home/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/admin/publication" element={<AddPublication/>}/>
          <Route path="/publications/" element={<Publications type={PublicationType.GET}/>} />
          <Route path="/signUp" element={<Signup/>}/>   
          <Route path="/admin/*" element={<ProtectedRoute componentToRender={Admin}/>}/>
          <Route path="/admin/login" element={<AdminLogin/>} />
          <Route path="/admin/query_id/:Offset" element={<ProtectedRoute componentToRender={AdminFull}/>}/>
          <Route path="/admin/publications" element={<AdminPublications/>} />
          <Route path="/" element={<Navigate to="/home"/>}/>
          <Route path="*" element={<h1>Page Not Found</h1>} />          
        </Routes>
      </div>
      <Footer />
    </div>
    </AlertState>
  );
}
