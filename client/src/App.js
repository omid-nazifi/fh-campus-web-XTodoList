import React, { Component } from 'react';
import './styles/App.css';
import Logo from './img/logo512.png';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { BsFacebook, BsTwitter, BsInstagram } from "react-icons/bs"


import SignIn from './scripts/signin';
import SignUp from './scripts/signup';
import Dashboard from './scripts/dashboard';

class App extends Component {
  render() {
    const footer = this.footer();
    return (
      <Router>
        <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
          <main>
            <div className="App">
              <div className="auth-wrapper">
                <div className="auth-inner">
                  <Switch>
                    <Route exact path='/' component={Dashboard} />
                    <Route path="/sign-in" component={SignIn} />
                    <Route path="/sign-up" component={SignUp} />
                  </Switch>
                </div>
              </div>
            </div>
          </main>
          {footer}
        </div>
      </Router>
    );
  }

  footer() {
    return (
      <footer className="container d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1" aria-label="logo">
            <img src={Logo} alt="Logo" height="24" />
          </a>
          <span className="text-muted">&copy; 2021 XToDo List, Inc</span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3"><a className="text-muted" href="#twitter" aria-label="Twitter"><BsTwitter /></a></li>
          <li className="ms-3"><a className="text-muted" href="#instagram" aria-label="Instagram"><BsInstagram /></a></li>
          <li className="ms-3"><a className="text-muted" href="#facebook" aria-label="Facebbok"><BsFacebook /></a></li>
        </ul>
      </footer>
    )
  }
}

export default App;
