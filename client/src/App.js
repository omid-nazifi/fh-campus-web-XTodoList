import React, { Component } from 'react';
import './styles/App.css';
import Logo from './img/logo512.png';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { BsFacebook, BsTwitter, BsInstagram } from "react-icons/bs"


import SignIn from './scripts/signin';
import SignUp from './scripts/signup';

class App extends Component {
  render() {
    const header = this.header();
    const footer = this.footer();
    return (
      <Router>
        <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
          {header}
          <main>
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
            </div>
          </main>
          {footer}
        </div>
      </Router>
    );
  }

  header() {
    return (
      <header class="mb-auto">
        <div>
  
          <h3 class="float-md-start mb-0"><img src={Logo} alt="Logo" height="75" /> XTodo List</h3>
          <nav class="nav nav-masthead justify-content-center float-md-end">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
            <a class="nav-link" href="#">Features</a>
            <a class="nav-link" href="#">Contact</a>
          </nav>
        </div>
      </header>
    )
  }

  footer() {
    return (
      <footer class="container d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <div class="col-md-4 d-flex align-items-center">
              <a href="/" class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1" aria-label="logo">
                  <img src={Logo} alt="Logo" height="24"/>
              </a>
              <span class="text-muted">&copy; 2021 XToDo List, Inc</span>
          </div>

          <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
              <li class="ms-3"><a class="text-muted" href="#" aria-label="Twitter"><BsTwitter/></a></li>
              <li class="ms-3"><a class="text-muted" href="#" aria-label="Instagram"><BsInstagram/></a></li>
              <li class="ms-3"><a class="text-muted" href="#" aria-label="Facebbok"><BsFacebook/></a></li>
          </ul>
      </footer>
  )
  }
}

export default App;
