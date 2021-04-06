import React, { Component } from 'react'
import YoneticiService from '../services/yonetici_service'
import { Table } from "reactstrap";
import moment from 'moment'
import 'moment/locale/tr'


export default class Taleplerim extends Component {


    constructor(props) {
        super(props);

        this.state = {
            Talepler: [],

        };
    }

    componentDidMount() {
        this.talepler()
    }


    talepler() {

        YoneticiService.getTaleplerim().then(
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




    render() {
        return (
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>Tarih</th>
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
                                <td>{moment().locale('tr'),
                                    moment(talep.tarih).format('LL')}</td>
                                <td>{talep.rol}</td>
                                <td>{talep.sayi}</td>
                                <td>{talep.butce}</td>

                                {talep.onay === "Onaylandı" && (
                                    <td className="text-success">Onaylandı</td>
                                )}

                                {talep.onay === "Reddedildi" && (
                                    <td className="text-danger">Reddedildi</td>
                                )}

                                {talep.onay === "ik" && (
                                    <td>İK Onayında</td>
                                )}




                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        )
    }
}

