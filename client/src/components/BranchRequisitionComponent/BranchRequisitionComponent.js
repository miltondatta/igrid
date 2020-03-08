import React, {Component} from 'react';
import jwt from 'jsonwebtoken';
import ReactDataTable from "../../module/data-table-react/ReactDataTable";
import axios from "axios";
import {apiUrl} from "../../utility/constant";

class BranchRequisitionComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewDetails: false,
            user: {},
            requisitionData: [],
            requisitionTableData: [],
        }
    }

    componentDidMount() {
        const user = jwt.decode(localStorage.getItem('user')).data;
        this.setState({user});
        Object.keys(user).length && this.getData(user.id);
    }

    getData = id => {
        this.setState({
            isLoading: true
        }, () => {
            axios.post(apiUrl() + 'my-requisition/by/credentials', {user_id: id})
                .then(res => {
                    this.setState({
                        requisitionData: res.data[0],
                        isLoading: false
                    }, () => {
                        let requisitionTableData = [];
                        res.data[0].map(item => {
                            const newObj = {
                                id: item.id,
                                requisition_no: item.requisition_no,
                                request_date: item.request_date,
                                request_by: item.request_by,
                                role_name: item.role_name,
                                location_name: item.location_name
                            };
                            requisitionTableData.push(newObj);
                        });
                        this.setState({requisitionTableData});
                    })
                })
                .catch(err => {
                    console.log(err.response);
                })
        })
    };

    assetList = id => {
        axios.get(apiUrl() + 'requisition-details/status/' + id)
            .then(res => {
                this.setState({
                    viewDetails: true,
                    requisitionDetailsData: res.data
                })
            })
    };

    render() {
        const {requisitionTableData} = this.state;

        return (
            <div className={'bg-white rounded p-2 m-3'}>
                <nav className="navbar text-center mb-2 ml-0 pl-2 rounded">
                    <p className="text-blue f-weight-700 f-22px m-0">My Delivery</p>
                </nav>
                {/*{viewDetails ? <>
                    <nav className="navbar text-center mb-2 mt-1 pl-2 rounded">
                        <p onClick={() => {this.setState({viewDetails: false, requisitionDetailsStatus: []})}} className="text-blue cursor-pointer f-weight-700 f-20px m-0" ><i className="fas fa-chevron-circle-left"></i> Go Back</p>
                    </nav>
                    <ReactDataTable
                        tableData={requisitionDetailsStatus}
                        assetList={this.assetList}
                    /> </>: <ReactDataTable
                    tableData={requisitionStatus}
                    assetList={this.assetList}
                    details
                />}*/}
                <ReactDataTable
                    tableData={requisitionTableData}
                    assetList={this.assetList}
                    details
                />
            </div>
        );
    }
}

export default BranchRequisitionComponent;