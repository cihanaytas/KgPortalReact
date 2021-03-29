import React, { Component } from "react";
import { Col, ListGroup, ListGroupItem, Row } from "reactstrap";

import UserService from "../services/user_service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      dogumgunleri:[]
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
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

    UserService.getBirthDays().then(
      response => {
        console.log(response.data)
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





  }

  render() {
    return (
      <div>

      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>

        </header>
      </div>

      <Row>
                  <Col xs="3">
                    DOĞUM GÜNÜ OLAN ÇALIŞANLAR
                  <ListGroup>
        {this.state.dogumgunleri.map(dogum => (
            <ListGroupItem
                key={dogum.username}>
                {dogum.username}
            </ListGroupItem>
        ))}
        </ListGroup>
                  </Col>
                  <Col xs="9">
                      aaaaaaaaaa
                  </Col>
              </Row>

    
   
        </div>



             
                            
       
            



    );
  }
}