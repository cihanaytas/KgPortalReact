import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {Col, Row } from "reactstrap";
import moment from 'moment'
import 'moment/locale/tr'
import UserService from "../services/user_service";
import * as haberleraction from "../actions/haberler";
import { bindActionCreators } from "redux";
import HaberSlayt from "./HaberSlayt";


class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dogumgunleri: [],
      news: []
    };
  }







  componentDidMount() {


    UserService.getBirthDays().then(
      response => {
        this.setState({
          dogumgunleri: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );


    // UserService.getNews().then(

    //   response => {
    //     this.setState({
    //       news: response.data
    //     });
    //   },
    //   error => {
    //     this.setState({
    //       content:
    //         (error.response && error.response.data) ||
    //         error.message ||
    //         error.toString()
    //     });
    //   }
    // );


    this.props.actions.getHaberlers();

  }



  render() {
    return (
      <div>

        <div className="container">
          <header className="jumbotron">

            <h3> ANASAYFA</h3>

          </header>
        </div>

        <Row>
          {this.state.dogumgunleri.length != 0 && (
            <Col xs="3">

              <table class="table">
                <thead class="thead-dark">
                  <tr>
                    <th>Doğum Günü</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.dogumgunleri.map(dogum => (
                    <tr key={dogum.username}>
                      <td>{dogum.name} {dogum.surname}</td>
                    </tr>
                  ))}
                </tbody>
              </table>


            </Col>
          )}


          <Col xs="9">

  


            {/* 
            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th>Tarih</th>
                  <th>Haber</th>
                </tr>
              </thead>
              <tbody>
                {this.props.haberler.map(haber => (
                  <tr key={haber.id}>
                    <td>{moment().locale('tr'),
                      moment(haber.date).format('LL')}</td>
                    <td>{haber.haber}</td>
                  </tr>
                ))}
              </tbody>
            </table> */}


<HaberSlayt/>




          </Col>

        </Row>



      </div>



    );
  }
}


function mapStateToProps(state) {
  return {
    haberler: state.testhaber
  };
}




function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getHaberlers: bindActionCreators(haberleraction.getNews, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);