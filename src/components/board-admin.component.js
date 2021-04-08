import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect, Route, Switch, } from "react-router";
import Home from "./home_component";
import İletisim from "./iletisim";
import Duyuru from "./Duyuru";
import Talep from "./Talep";
import { connect } from "react-redux";
import AdminIzinTalepler from "./AdminIzinTalepler";


class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
    
      
    };

  }


  render() {

    if ( this.props.user.userkg.role!="ADMIN") {
      return <Redirect to="/" />;
    }
    return (
        <div>
        <div className="container">
          <header className="jumbotron">
            <h3>İK</h3>
          </header>
        </div>

          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav mr-auto">
   
              <li className="nav-item">
                <Link to={"/admin/duyuru"} className="nav-link">
                  İnsan Kaynakları
                  </Link>
              </li>
              <li className="nav-item">
                <Link to={"/admin/talep"} className="nav-link">
                  Yönetici Talepleri
                  </Link>
              </li>

              <li className="nav-item">
                <Link to={"/admin/izintalep"} className="nav-link">
                  İzin Talepleri
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
            <Route exact path={["/", "/home"]} component={Home} />
            <Route path="/admin/iletisim" component={İletisim} />
            <Route path="/admin/duyuru" component={Duyuru} />
            <Route path="/admin/talep" component={Talep} />
            <Route path="/admin/izintalep" component={AdminIzinTalepler} />
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

export default connect(mapStateToProps)(BoardAdmin);