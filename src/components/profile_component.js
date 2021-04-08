import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import moment from 'moment'
import 'moment/locale/tr'



class Profile extends Component {

  render() {
    const { user: currentUser } = this.props;

    if (!currentUser) {

      return <Redirect to="/login" />;
    }

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>Profil</strong> 
          <br/>   <br/> 
            {currentUser.userkg.username}  <br/>   <br/> 
            {currentUser.userkg.name}   {currentUser.userkg.surname}
             <br/>   <br/> 
            {moment().locale('tr'), moment(currentUser.userkg.birthDay).format('LL')
            }  <br/>   <br/> 
          </h3>
        </header>


      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Profile);