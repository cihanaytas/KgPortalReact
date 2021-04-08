import React, { Component } from 'react'
import UserService from '../services/user_service'
import { Table } from 'reactstrap';
import moment from 'moment'
import 'moment/locale/tr'



export default class Organization extends Component {

    constructor(props) {
        super(props);

        this.state = {
            organizasyon: {},
            user: {},
            yonetici: {}
        };
    }


    componentDidMount() {
        UserService.getOrganization().then(response => {
            this.setState({
                organizasyon: response.data,
                user: response.data.user,
                yonetici: response.data.userYonetici
            })
        })

    }




    render() {
        return (
            <div>



                { <Table>
                    <thead>
                        <tr>
                            <th>Adı Soyadı</th>
                            <th>Mail</th>
                            <th>Doğum Tarihi</th>
                            <th>İşe Giriş Tarihi</th>
                            <th>Proje</th>
                            <th>Unvan</th>
                            <th>Yöneticisi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.state.user.name} {this.state.user.surname}</td>
                            <td>{this.state.user.username}</td>

                            <td>{moment().locale('tr'), moment(this.state.user.birthDay).format('LL')
                            }</td>

                            <td>{moment().locale('tr'), moment(this.state.organizasyon.iseGirisTarih).format('LL')
                            }</td>
                            <td>{this.state.organizasyon.proje}</td>
                            <td>{this.state.organizasyon.unvan}</td>
                            <td>{this.state.yonetici.name} {this.state.yonetici.surname}</td>
                        </tr>


                    </tbody>
                </Table>}

            </div>
        )
    }
}
