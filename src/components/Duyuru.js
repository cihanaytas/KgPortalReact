import React, { Component } from 'react'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { habergir } from "../actions/habergiris";
import { connect } from 'react-redux';
import AdminService from '../services/admin_service'


export default class Duyuru extends Component {
    constructor(props) {
        super(props);
        this.onChangeHaber = this.onChangeHaber.bind(this);

        this.state = {
            haber: ""
        };
    }

    onChangeHaber(e) {
        this.setState({
            haber: e.target.value,
        });
    }

    submitHandler = e => {
        e.preventDefault()
        AdminService.addHaber(this.state.haber)

    }

    render() {
        return (
            <div>
                <Form onSubmit={this.submitHandler}>
                    <div className="form-group">
                        <label htmlFor="haber">Haber</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="haber"
                            value={this.state.haber}
                            onChange={this.onChangeHaber}
                        />
                    </div>


                    <div className="form-group">
                        <button
                        type="submit"
                            className="btn btn-primary btn-block"
                            disabled={this.state.loading}
                        >
                            <span>Gönder</span>
                        </button>
                    </div>
                </Form>
            </div>
        )
    }

}


