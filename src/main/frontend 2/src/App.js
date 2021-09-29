import { Route, Switch } from "react-router-dom";
import About from "./components/About";
import Admin from "./components/Admin";
import Footer from "./components/Footer";
import Form from "./components/Form";
import Home from "./components/Home";
import AdminFull from './components/items/FullScreenQuery';
import Navbar from "./components/Navbar";
import Publications from "./components/Publication";
import "./css/App.css";
//import ProtectedRoutes from "./ProtectedRoutes";
export default function App() {
  return (
      <div className="App">
        <Navbar />
        <div className="body">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/admin/:id" component={AdminFull} />
            <Route exact path="/publications" component={Publications} />
            <Route exact path="/post" component={Form} />
          </Switch>
        </div>
        <Footer />
      </div>
  );
}
