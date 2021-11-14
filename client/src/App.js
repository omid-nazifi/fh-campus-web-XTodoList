import './styles/App.css';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


import SignIn from './scripts/signin';
import SignUp from './scripts/signup';

function App() {
  return (
  <Router>
    <div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/' component={SignIn} />
            <Route path="/sign-in" component={SignIn} />
            <Route path="/sign-up" component={SignUp} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default App;
