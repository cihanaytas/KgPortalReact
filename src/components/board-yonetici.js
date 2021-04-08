import React, { Component } from "react";
import { connect } from "react-redux";
import Home from "./home_component";
import İletisim from "./iletisim";
import Profile from './profile_component'
import { Link } from "react-router-dom";
import { Redirect, Route, Switch, } from "react-router";
import Duyuru from "./Duyuru";
import Talep from "./Talep";
import YoneticiService from "../services/yonetici_service";
import Taleplerim from "./yoneticiTaleplerim";
import Example from "./HaberSlayt";
import YoneticiIzinTalepler from "./YoneticiIzinTalepler";




class BoardYonetici extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: "",
            talepnedir: ""
        };
    }





    onChangeHandler(e) {

        this.setState({
            talepnedir: e.target.value

        });
        console.log("a")

    }

    componentDidMount() {


    }

    render() {

        if (this.props.user.userkg.role != "YONETICI") {
            return <Redirect to="/" />;
        }

        return (
            <div>
                <div className="container">
                    <header className="jumbotron">
                        <h3>Yönetici Sayfası</h3>
                    </header>
                </div>



                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <div className="navbar-nav mr-auto">


                        <li className="nav-item" text="bg-success">
                            <Link to={"/yonetici/talep"} className="nav-link">
                                Talep Ver
                             </Link>

                            {/* <select className="bg-dark" name="talepnedir" id="talepnedir"  onChange={this.onChangeHandler}>
                                    <option value="yonetici/talep" >Talep Ekle</option>
                                    <option value="yonetici/taleplerim">Taleplerim</option>
                                </select> */}


                        </li>

                        <li>
                            <Link to={"/yonetici/taleplerim"} className="nav-link">
                                Taleplerim
                             </Link>
                        </li>

                        
                        <li>
                            <Link to={"/yonetici/izintalepleri"} className="nav-link">
                                Personel İzin Talepleri
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
                            <Link to={"/yonetici/iletisim"} className="nav-link">
                                İletişim
                         </Link>
                        </li>
                    </div>
                </nav>


                <div className="container mt-3">
                    <Switch>
                        <Route exact path={["/", "/home"]} component={Home} />
                        <Route path="/yonetici/iletisim" component={İletisim} />
                        <Route path="/yonetici/duyuru" component={Duyuru} />
                        <Route path="/yonetici/talep" component={Talep} />
                        <Route path="/yonetici/taleplerim" component={Taleplerim} />
                        <Route path="/yonetici/izintalepleri" component={YoneticiIzinTalepler} />
                        izintalepleri

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

export default connect(mapStateToProps)(BoardYonetici);