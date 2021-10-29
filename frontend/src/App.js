import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect, Route, Switch } from "react-router-dom";
import About from "./components/About";
import Admin from "./components/Admin";
import Footer from "./components/Footer";
import Home from "./components/Home";
import AdminFull from './components/items/FullScreenQuery';
import Navbar from "./components/Navbar";
import Publications from "./components/Publication";
import './css/App.css';
import ProtectedRoute from "./ProtectedRoute";
export default function App() {
  return (
      <div className="App">
        <Navbar />
        <div className="body">
          <Switch>
            <Route exact path="/" render={()=><Redirect to={{pathname:"/home"}}/>} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/about" component={About} />
            <ProtectedRoute exact path="/admin/"component={Admin} />
            <ProtectedRoute exact path="/admin/query_id/:Offset" component={AdminFull} />
            <Route exact path="/publications/:Offset" component={Publications} />
            <Route exact path="/publications/" render={()=><Redirect to="/publications/0/"/>} />
            <Route path="*" render={()=><h1>Page Not Found</h1>}/>
          </Switch>
        </div>
        <Footer />
      </div>
  );
}
