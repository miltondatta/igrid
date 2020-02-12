import Axios from 'axios'
import React, {Component} from 'react';
import {apiUrl} from "../../utility/constant";
import StatusOptions from "../../utility/component/statusOptions";

class DeliveryRequestComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            resData: []
        }
    }

    subAssets = (id) => {
        let data = []
        Axios.get(apiUrl() + 'assets-entry/sub-assets/' + id)
            .then(resData => {
                if (resData.data.length > 0) {
                    data = resData.data
                }
            })

        const selectAsset = data.length > 0 && data.map((item, index) => {
            return(
                <option value={item.id}>{}</option>
            )
        })
    }

    componentDidMount = () => {
        Axios.get(apiUrl() + 'requisition-approve')
            .then(resData => {
                this.setState({
                    resData: resData.data
                })
            })
    }

    render() {
        const {resData} = this.state
        let tableData = resData.map((item, index) => {
            return(
                <tr key={index + 10}>
                    <td>{index + 1}</td>
                    <td>{item.category_name}</td>
                    <td>{item.sub_category_name}</td>
                    <td>{item.role_name}</td>
                    <td>{item.location_name}</td>
                    <td>{item.update_quantity}</td>
                </tr>
            )
        })
        return (
            <div>
                <div className={'bg-white p-3 rounded shadow'}>
                    <nav className="navbar text-center mb-3 p-2 rounded">
                        <p className="text-dark f-weight-500 f-20px m-0">Delivery Request</p>
                    </nav>
                    <div className={'ui-req-history'}>
                        <table className="table">
                            <thead className="thead-dark">
                            <tr>
                                <th>No</th>
                                <th>Category</th>
                                <th>Sub Category</th>
                                <th>Role</th>
                                <th>Location</th>
                                <th>Quantity</th>
                            </tr>
                            </thead>
                            <tbody>
                                {tableData}
                            </tbody>
                        </table>
                        <div className="d-flex w-100 justify-content-end">
                            <button className="btn btn-info px-4 f-18px">Deliver</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DeliveryRequestComponent;