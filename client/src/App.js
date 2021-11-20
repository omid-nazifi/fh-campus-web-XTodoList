import React, { Component } from 'react';
import './styles/App.css';
import Logo from './img/logo512.png';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { BsFacebook, BsTwitter, BsInstagram, BsBellFill, BsGearFill } from "react-icons/bs"


import SignIn from './scripts/signin';
import SignUp from './scripts/signup';
import Dashboard from './scripts/dashboard';

class App extends Component {
  render() {
    const header = this.header();
    const footer = this.footer();
    return (
      <Router>
        <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
          {/* {header} */}
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

  header() {
    return (
      // <nav class="navbar navbar-expand-lg navbar-light bg-light">
      //   <div class="container-fluid justify-content-between">
      //     <div class="d-flex">
      //       <a class="navbar-brand me-2 mb-1 d-flex align-items-center" href="#">
      //         <img src={Logo} height="20" alt="Logo" style={{ "margin-top": "2px;" }} />
      //       </a>
      //     </div>

      //     <ul class="navbar-nav flex-row">
      //     <li class="nav-item me-3 me-lg-1">
      //         <a class="nav-link" href="#">
      //           <span><BsGearFill/></span>
      //         </a>
      //       </li>
      //       <li class="nav-item me-3 me-lg-1 active">
      //         <a class="nav-link" href="#">
      //           <span><BsBellFill/></span>
      //           <span class="badge rounded-pill badge-notification bg-danger">1</span>
      //         </a>
      //       </li>

      //       <li class="nav-item dropdown me-3 me-lg-1">
      //         <a class="nav-link dropdown-toggle hidden-arrow"
      //           href="#"
      //           id="navbarDropdownMenuLink"
      //           role="button"
      //           data-mdb-toggle="dropdown"
      //           aria-expanded="false"
      //         >
      //           <img
      //             src="https://mdbootstrap.com/img/new/avatars/1.jpg"
      //             class="rounded-circle"
      //             height="22"
      //             alt=""
      //             loading="lazy"
      //           />
      //         </a>
      //         <ul
      //           class="dropdown-menu dropdown-menu-end"
      //           aria-labelledby="navbarDropdownMenuLink"
      //         >
      //           <li>
      //             <a class="dropdown-item" href="#">Some news</a>
      //           </li>
      //           <li>
      //             <a class="dropdown-item" href="#">Another news</a>
      //           </li>
      //           <li>
      //             <a class="dropdown-item" href="#">Something else here</a>
      //           </li>
      //         </ul>
      //       </li>
      //     </ul>
      //   </div>
      // </nav>
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
            <img src={Logo} alt="Logo" height="24" />
          </a>
          <span class="text-muted">&copy; 2021 XToDo List, Inc</span>
        </div>

        <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li class="ms-3"><a class="text-muted" href="#" aria-label="Twitter"><BsTwitter /></a></li>
          <li class="ms-3"><a class="text-muted" href="#" aria-label="Instagram"><BsInstagram /></a></li>
          <li class="ms-3"><a class="text-muted" href="#" aria-label="Facebbok"><BsFacebook /></a></li>
        </ul>
      </footer>
    )
  }
}

export default App;
