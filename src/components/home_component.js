import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, ListGroup, ListGroupItem, Row } from "reactstrap";

import UserService from "../services/user_service";

export default class Home extends Component {
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


    UserService.getNews().then(
      response => {
        this.setState({
          news: response.data
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
          <Col xs="3">
            DOĞUM GÜNÜ OLAN ÇALIŞANLAR
                  <ListGroup>
              {this.state.dogumgunleri.map(dogum => (
                <ListGroupItem
                  key={dogum.username}>
                  {dogum.name} {dogum.surname}
                </ListGroupItem>

              ))}
            </ListGroup>
          </Col>


          <Col xs="9">
            HABERLER
            <ListGroup>
              {this.state.news.map(haber => (
                <ListGroupItem
                  key={haber.id}>
                  {haber.haber} {haber.date}
                </ListGroupItem>
              )

              )}
            </ListGroup>

          </Col>

        </Row>



      </div>










    );
  }
}