import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Route, Switch, } from "react-router";
import { Col, Row } from "reactstrap";

import UserService from "../services/user_service";
import Home from "./home_component";
import İletisim from "./board-iletisim";
import Profile from './profile_component'
import Duyuru from "./Duyuru";


export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };

  }

  componentDidMount() {
    UserService.getAdminBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {

    return (
      <div>
        <div className="container">
          <header className="jumbotron">
            <h3>{this.state.content}</h3>
          </header>
        </div>

          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav mr-auto">
   
              <li className="nav-item">
                <Link to={"/admin/duyuru"} className="nav-link">
                  İnsan Kaynaklar
                  </Link>
              </li>
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  Muhasebe
                  </Link>
              </li>
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  Organizasyon Şeması
                  </Link>
              </li>
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  İdari İşler
                  </Link>
              </li>
              <li className="nav-item">
                <Link to={"/admin/iletisim"} className="nav-link">
                  İletişim
                  </Link>
              </li>
            </div>
          </nav>


        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/sda"]} component={Home} />
            <Route path="/admin/iletisim" component={İletisim} />
            <Route path="/admin/duyuru" component={Duyuru} />
          </Switch>

        </div>


      </div>

    );
  }
}