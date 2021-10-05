import { Route, Switch } from "react-router-dom";
import About from "./components/About";
import Admin from "./components/Admin";
import Authentication from "./components/Authentication";
import Footer from "./components/Footer";
import Form from "./components/Form";
import Home from "./components/Home";
import AdminFull from './components/items/FullScreenQuery';
import Navbar from "./components/Navbar";
import Publications from "./components/Publication";
import './css/App.css';
export default function App() {
  return (
      <div className="App">
        <Navbar />
        <div className="body">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/login/:Offset">
              <Authentication type="login"/>
            </Route>
            <Route exact path="/logot/:Offset">
              <Authentication type="logout"/>
            </Route>
            <Route exact path="/admin/:Offset"component={Admin} />
            <Route exact path="/admin/query_id/:Offset" component={AdminFull} />
            <Route exact path="/publications/:Offset" component={Publications} />
            <Route exact path="/post" component={Form} />
            <Route path="*" render={()=><h1>Page Not Found</h1>}/>
          </Switch>
        </div>
        <Footer />
      </div>
  );
}
