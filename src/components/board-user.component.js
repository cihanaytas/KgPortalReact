import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect, Route, Switch, } from "react-router";
import UserService from "../services/user_service";
import Organization from "./Organization";
import Duyuru from "./Duyuru";
import Talep from "./Talep";
import Home from "./home_component";
import { connect } from "react-redux";
import UserIzin from "./UserIzin";
import UserIzinTalepler from "./UserIzinTalepler";
import UserBildirim from "./UserBildirim";



class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }


  

  render() {
    if ( this.props.user.userkg.role!="USER") {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>USER SAYFASI</h3>
        </header>



        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="navbar-nav mr-auto">




            <li className="nav-item">
              <Link to={"/user/izin"} className="nav-link">
                İzin Al
                  </Link>
            </li>


            <li className="nav-item">
              <Link to={"/user/izintalepler"} className="nav-link">
                İzin Taleplerim
                  </Link>
            </li>


            <li className="nav-item">
              <Link to={"/user/organization"} className="nav-link">
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
            <li className="nav-item">
                <Link to={"/user/bildirimler"} className="nav-link">
                  Bildirimler
                </Link>
              </li>
            
          </div>
        </nav>


        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route path="/user/organization" component={Organization} />
            <Route path="/user/izin" component={UserIzin} />
            <Route path="/user/izintalepler" component={UserIzinTalepler} />
            <Route path="/admin/duyuru" component={Duyuru} />
            <Route path="/admin/talep" component={Talep} />
            <Route path="/user/bildirimler" component={UserBildirim} />
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

export default connect(mapStateToProps)(BoardUser);