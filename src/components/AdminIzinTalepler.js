import React, { Component } from 'react'
import { Table } from "reactstrap";
import AdminService from '../services/admin_service'
import moment from 'moment'
import 'moment/locale/tr'


export default class AdminIzinTalepler extends Component {

    constructor(props) {
        super(props);

        this.state = {
            IzinTalepler: []
        };
    }

    onayla(talep) {
        talep.onayDurum = "Onaylandı"
        AdminService.izinTalepOnay(talep)
        this.setState({})
    }

    reddet(talep) {
        talep.onayDurum = "Reddedildi"
        AdminService.izinTalepOnay(talep)
        this.setState({})

    }


    componentDidMount() {
        AdminService.getIzinTalepleri().then(
            response => {
                this.setState({
                    IzinTalepler: response.data
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

    render() {
        return (
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>Talep No</th>
                            <th>Personel</th>
                            <th>Talep Tarih</th>
                            <th>İzin Tarihleri</th>
                            <th>İzin Türü</th>
                            <th>Açıklama</th>
                            <th>Onay Durumu</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.IzinTalepler.map(talep => (
                            <tr key={talep.id}>
                                <th scope="row">{talep.id}</th>
                                <td>{talep.user.name} {talep.user.surname}</td>
                                <td>{moment().locale('tr'),
                                    moment(talep.talepTarih).format('LL')}</td>
                                {moment(talep.izinBaslangicTarih).format('YYYY') === moment(talep.izinBitisTarih).format('YYYY') &&
                                    <td>{moment().locale('tr'),
                                        moment(talep.izinBaslangicTarih).format('DD MMMM')} - {moment().locale('tr'),
                                            moment(talep.izinBitisTarih).format('LL')}</td>}

                                {moment(talep.izinBaslangicTarih).format('YYYY') != moment(talep.izinBitisTarih).format('YYYY') &&
                                    <td>{moment().locale('tr'),
                                        moment(talep.izinBaslangicTarih).format('LL')} - {moment().locale('tr'),
                                            moment(talep.izinBitisTarih).format('LL')}</td>}


                                <td>{talep.izinTip}</td>
                                <td>{talep.aciklama}</td>
                                {talep.onayDurum === "ik" && (
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

                                {talep.onayDurum === "Onaylandı" && (
                                    <td className="text-success">Onaylandı</td>
                                )}

                                {talep.onayDurum === "Reddedildi" && (
                                    <td className="text-danger">Reddedildi</td>
                                )}

                                {talep.onayDurum === "yonetici" && (
                                    <td className="text-primary">Yönetici Onayında</td>
                                )}

                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        )
    }
}
