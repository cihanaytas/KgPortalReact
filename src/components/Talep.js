import React, { Component } from 'react'
import { Table } from "reactstrap";
import AdminService from '../services/admin_service'
import YoneticiService from '../services/yonetici_service'
import moment from 'moment'
import 'moment/locale/tr'
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

class Talep extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Talepler: [],
            talepobje: {
                sayi: '',
                butce: '',
                proje: '',
                rol: '',
                roltanim: ''
            }

        };
    }


    onayla(talep) {
        talep.onay = "Onaylandı"
        AdminService.talepOnay(talep)
        this.setState({})
    }

    reddet(talep) {
        talep.onay = "Reddedildi"
        AdminService.talepOnay(talep)
        this.setState({})

    }




    talepler() {

        AdminService.getTalep().then(
            response => {
                this.setState({
                    Talepler: response.data
                })
            },
            error => {
                this.setState({
                    content:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        )
    }



    componentDidMount() {
        this.props.user.userkg.role === "ADMIN" && this.talepler()
    }


    onChangeHandler = e => {

        this.setState({
            talepobje:{
            ...this.state.talepobje,
            [e.target.name]: e.target.value }
        });
    
    }





    submitHandler = e => {
        e.preventDefault()
        const { history } = this.props;
        console.log(this.state.talepobje)
        YoneticiService.addTalep(this.state.talepobje).then(
            response => {
                if (response.data == true) {
                    alertify.success("Talep İK'ya iletildi", 3)
                    history.push("/yonetici");
                    window.location.reload();
                }
                else { alertify.error("Başarısız", 2) }
            }
        )
    }




    renderYonetici() {
        const { message } = this.props;
        const { roltanim, sayi, butce, proje, rol } = this.state.talepobje

        return (
            <div>
                <Form onSubmit={this.submitHandler} ref={(c) => {
                    this.form = c;
                }}>

                    <div className="form-group">
                        <label htmlFor="proje">Proje:</label>
                        <select name="proje" id="proje" value={proje} onChange={this.onChangeHandler}>
                            <option value="Turkcell Bulut Projesi">Turkcell Bulut Projesi</option>
                            <option value="Anadolu Jet Mobil Projesi">Anadolu Jet Mobil Projesi</option>
                            <option value="Turk Telekom Big Data Projesi">Türk Telekom Big Data Projesi</option>
                            <option value="Turkcell Mesaj Ussu Projesi">Turkcell Mesaj Ussu Projesi</option>
                        </select>
                    </div>


                    <div className="form-group">
                        <label htmlFor="rol">Rol:</label>
                        <select name="rol" id="rol" value={rol} onChange={this.onChangeHandler}>
                            <option value="Developer">Developer</option>
                            <option value="Analist">Analist</option>
                            <option value="Test Uzmanı">Test Uzmanı</option>
                            <option value="DWH Uzmanı">DWH Uzmanı</option>
                        </select>
                    </div>



                    <div className="form-group">
                        <label htmlFor="roltanim">Rol tanımı</label>
                        <Input
                            placeholder="Rol Tanımı"
                            type="text"
                            className="form-control"
                            name="roltanim"
                            value={roltanim}
                            onChange={this.onChangeHandler}
                            validations={[required]}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="sayi">Sayi</label>
                        <Input
                            placeholder="Sayi giriniz"
                            type="number"
                            className="form-control"
                            name="sayi"
                            value={sayi}
                            onChange={this.onChangeHandler}
                            validations={[required]}
                        />
                    </div>



                    <div className="form-group">
                        <label htmlFor="butce">Bütçe</label>
                        <Input
                            placeholder="Bütçe giriniz"
                            type="number"
                            className="form-control"
                            name="butce"
                            value={butce}
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



    renderForAdmin() {
        return (
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>Talep No</th>
                            <th>Tarih</th>
                            <th>Talep</th>
                            <th>Rol</th>
                            <th>Personel Sayısı</th>
                            <th>Bütçe</th>
                            <th>Onay Durumu</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.Talepler.map(talep => (
                            <tr key={talep.id}>
                                <th scope="row">{talep.id}</th>
                                <td>{moment().locale('tr'),
                                    moment(talep.tarih).format('LL')}</td>
                                <td>{talep.name} {talep.surname}</td>
                                <td>{talep.rol}</td>
                                <td>{talep.sayi}</td>
                                <td>{talep.butce}</td>
                                {talep.onay === "ik" && (
                                    <td>
                                        <button
                                            onClick={() => this.onayla(talep)}
                                            type="submit"
                                            className="btn btn-success btn-block"
                                            disabled={this.state.loading}
                                        >
                                            <span>Onayla</span>
                                        </button>

                                        <button
                                            onClick={() => this.reddet(talep)}
                                            type="submit"
                                            className="btn btn-danger btn-block"
                                            disabled={this.state.loading}
                                        >
                                            <span>Reddet</span>
                                        </button>
                                    </td>
                                )}

                                {talep.onay === "Onaylandı" && (
                                    <td className="text-success">Onaylandı</td>
                                )}

                                {talep.onay === "Reddedildi" && (
                                    <td className="text-danger">Reddedildi</td>
                                )}


                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        )
    }




    render() {
        return (
            <div>
                {this.props.user.userkg.role === "ADMIN" ? this.renderForAdmin() : this.renderYonetici()}
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

export default connect(mapStateToProps)(Talep);
