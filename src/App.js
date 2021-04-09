import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Router, Switch, Route } from 'react-router'
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/login_component";
import Home from "./components/home_component";
import Profile from "./components/profile_component";
import BoardUser from "./components/board-user.component";
import BoardAdmin from "./components/board-admin.component";
import { logout } from "./actions/auth";
import boardYonetici from "./components/board-yonetici";
import 'alertifyjs/build/css/alertify.min.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
    };


  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.userkg.role === "ADMIN",
        showUserBoard: user.userkg.role === "USER",
        showYoneticiBoard: user.userkg.role === "YONETICI"
      });
    }
  }

  logOut() {
    this.props.dispatch(logout());
  }

  render() {
    const { currentUser, showAdminBoard, showUserBoard, showYoneticiBoard } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            KG
            </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
                </Link>
            </li>


            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Sayfası
                  </Link>
              </li>
            )}



            {showYoneticiBoard && (
              <li className="nav-item">
                <Link to={"/yonetici"} className="nav-link">
                  Yönetici Sayfası
                  </Link>
              </li>
            )}


            {showUserBoard && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                  </Link>
              </li>
            )}
          </div>




          {currentUser ? (
            <div className="navbar-nav ml-auto">

              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  Profil
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                  </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                  </Link>
              </li>

            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path="/yonetici" component={boardYonetici} />

          </Switch>
        </div>
      </div>

    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user
  };
}

export default connect(mapStateToProps)(App);