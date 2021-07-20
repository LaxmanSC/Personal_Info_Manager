import { BrowserRouter as Router,Switch, Route} from "react-router-dom";
import './App.css';
import Home from './components/pages/Home';
import Signup from './components/pages/Signup';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/sign-up" exact component={Signup} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
