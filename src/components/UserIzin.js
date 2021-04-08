import React, { Component } from 'react'
import { Label } from "reactstrap";
import UserService from '../services/user_service'
import { connect } from 'react-redux';
import alertify from "alertifyjs"
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";


const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                Bu alan boş olamaz
            </div>
        );
    }
};


class UserIzin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            IzinTalepobje: {
                izinTip: '',
                izinBaslangicTarih: '',
                izinBitisTarih: '',
                aciklama: ''
            }

        };
    }


    onChangeHandler = e => {
        this.setState({
            IzinTalepobje: {
                ...this.state.IzinTalepobje,
                [e.target.name]: e.target.value
            }
        });

    }


    submitHandler = e => {
        e.preventDefault()
        const { history } = this.props;
        UserService.addIzinTalep(this.state.IzinTalepobje).then(
            response=>{
                if(response.data == true){
                    alertify.success("İzin talebi iletildi.",3)
                    history.push("/user")
                    window.location.reload();
                }
                else { alertify.error("Başarısız", 2) }
            }
        )

    }




    render() {
        const { message } = this.props;
        const { izinTip, izinBaslangicTarih, izinBitisTarih, aciklama } = this.state.IzinTalepobje
        return (
            <div>

                <Form onSubmit={this.submitHandler}>
                    <Label check>
                       <Input type="radio" value="Yıllık İzin" name="izinTip" checked={izinTip==="yillikizin"} onChange={this.onChangeHandler}/>{' '}  Yıllık izin</Label>
                       <Label check>  
                      <Input type="radio" value="Ücretli İzin"   name="izinTip" checked={izinTip==="ucretliizin"} onChange={this.onChangeHandler}/>{' '}  Ücretli izin</Label>
                      <Label check>  
                      <Input type="radio" value="Ücretsiz İzin"   name="izinTip" checked={izinTip==="ucretsizizin"} onChange={this.onChangeHandler}/>{' '}  Ücretsiz izin</Label>

        


                    <div className="form-group">
                        <label htmlFor="roltanim">İzin Başlangıç Tarihi</label>
                        <Input
                            type="date"
                            className="form-control"
                            name="izinBaslangicTarih"
                            value={izinBaslangicTarih}
                            onChange={this.onChangeHandler}
                            validations={[required]}
                        />
                    </div>


                    <div className="form-group">
                        <label htmlFor="roltanim">İzin Bitiş Tarihi</label>
                        <Input
                            placeholder="Açıklama"
                            type="date"
                            className="form-control"
                            name="izinBitisTarih"
                            value={izinBitisTarih}
                            onChange={this.onChangeHandler}
                            validations={[required]}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="roltanim">Açıklama</label>
                        <Input
                            placeholder="Açıklama"
                            type="text"
                            className="form-control"
                            name="aciklama"
                            value={aciklama}
                            onChange={this.onChangeHandler}
                            validations={[required]}
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




                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton
                        style={{ display: "none" }}
                        ref={(c) => {
                            this.checkBtn = c;
                        }}
                    />

                </Form>

            </div>
        )
    }
}



function mapStateToProps(state) {
    const { user } = state.auth;
    const { message } = state.message;
    return {
        user,
        message
    };
}

export default connect(mapStateToProps)(UserIzin);
