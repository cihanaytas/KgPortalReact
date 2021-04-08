import React, { Component } from 'react'
import { Table } from "reactstrap";
import UserService from '../services/user_service'
import moment from 'moment'
import 'moment/locale/tr'



export default class UserIzinTalepler extends Component {
    constructor(props) {
        super(props);

        this.state = {
            IzinTalepler: [],
        };
    }



    


    componentDidMount() {
        UserService.getIzinTalepleri().then(
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
                            <th>Talep Tarih</th>
                            <th>İzin Başlangıç Tarihi</th>
                            <th>İzin Bitiş Tarihi</th>
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
                                <td>{moment().locale('tr'),
                                    moment(talep.talepTarih).format('LL')}</td>
                                  <td>{moment().locale('tr'),
                                    moment(talep.izinBaslangicTarih).format('LL')}</td>
                                <td>{moment().locale('tr'),
                                    moment(talep.izinBitisTarih).format('LL')}</td>
                                <td>{talep.izinTip}</td>
                                <td>{talep.aciklama}</td>
                                {talep.onayDurum==="yonetici"&&  <td>Yönetici Onayında</td>}
                                {talep.onayDurum==="ik"&&  <td className="text-primary">İK Onayında</td>}
                                {talep.onayDurum==="Onaylandı"&&  <td className="text-success">Onaylandı</td>}
                                {talep.onayDurum==="Reddedildi"&&  <td className="text-danger">Reddedildi</td>}

                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        )
    }
}
