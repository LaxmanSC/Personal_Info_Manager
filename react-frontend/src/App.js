import { BrowserRouter as Router,Switch, Route} from "react-router-dom";
import './App.css';
import Home from './components/pages/Home';
import Signup from './components/pages/Signup';
import Navbar from './components/Navbar';
import Login from './components/pages/Login';
import Main from './components/pages/Main';

import injectContext from "./store/appContext";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/sign-up" exact component={Signup} />
          <Route path="/Login" exact component={Login} />
          <Route path="/Main" exact component={Main} />
        </Switch>
      </Router>
    </div>
  );
}

export default injectContext(App);
