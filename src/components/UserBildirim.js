import React, { Component } from 'react'
import { Table } from 'reactstrap';
import UserService from '../services/user_service'
import moment from 'moment'
import 'moment/locale/tr'

export default class UserBildirim extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Bildirimler: [],
        };
    }

    componentDidMount(){
        UserService.getBildirimler().then(
            response => {
                console.log(response.data)
                this.setState({
                    Bildirimler: response.data
                })
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
                            <th>Bildirim</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.Bildirimler.map(bildirim => (
                            <tr key={bildirim.id}>
                               
                                <td>{moment().locale('tr'),
                                    moment(bildirim[2]).format('LL')}</td>
                                  
                                <td>{bildirim[1]}</td>
   
                               </tr>
                        ))}
                    </tbody>
                </Table>



                
                
                
                
            </div>
        )
    }
}
