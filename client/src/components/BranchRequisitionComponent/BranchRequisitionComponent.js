import React, {Component} from 'react';
import jwt from 'jsonwebtoken';
import ReactDataTable from "../../module/data-table-react/ReactDataTable";
import axios from "axios";
import {apiUrl} from "../../utility/constant";
import PrintDelivery from "../DeliveryRequestComponent/PrintDelivery";
import '../../assets/print.css';
import Spinner from "../../layouts/Spinner";

class BranchRequisitionComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewDetails: false,
            user: {},
            requisitionData: [],
            requisitionTableData: [],
            requisitionDetailsData: [],
            requisitionDetailsTableData: [],
            printDelivery: false,
            printData: [],
            isLoading: false
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
        this.setState({
            isLoading: true
        }, () => {
            axios.post(apiUrl() + 'my-requisition-details/by/credentials', {user_id: this.state.user.id})
                .then(res => {
                    this.setState({
                        viewDetails: true,
                        requisitionDetailsData: res.data[0],
                        isLoading: false
                    }, () => {
                        let requisitionDetailsTableData = [];
                        res.data[0].map(item => {
                            const newObj = {
                                category_name: item.category_name,
                                sub_category_name: item.sub_category_name,
                                role_name: item.role_name,
                                location_name: item.location_name,
                                update_quantity: item.update_quantity
                            };
                            requisitionDetailsTableData.push(newObj);
                        });
                        this.setState({requisitionDetailsTableData}, () => {
                            let printData = [];
                            const {userName} = this.state.user;

                            res.data[0].map(item => {
                                const newObj = {
                                    brand: item.brand,
                                    model: item.model,
                                    update_quantity: item.update_quantity,
                                    location_name: item.location_name,
                                    requisition_no: item.requisition_no,
                                    username: userName
                                };
                                printData.push(newObj);
                            });
                            console.log(printData);
                            this.setState({printData});
                        });
                    })
                })
                .catch(err => {
                    console.log(err.response);
                })
        });
    };

    comeBack = () => {
        this.setState({
            printDelivery: false
        })
    };

    render() {
        const {requisitionTableData, viewDetails, requisitionDetailsTableData, printDelivery, printData, isLoading} = this.state;
        return (
            <div className={'bg-white rounded p-2 m-3'}>
                {printDelivery && <PrintDelivery resData={printData} comeBack={this.comeBack}/>}
                <nav className="navbar text-center mb-2 ml-0 pl-2 rounded">
                    <p className="text-blue f-weight-700 f-22px m-0">My Delivery</p>
                </nav>
                {isLoading ? <Spinner/> : viewDetails ? <>
                    <nav className="navbar text-center mb-2 mt-1 pl-2 rounded">
                        <p onClick={() => {
                            this.setState({viewDetails: false, requisitionDetailsData: []})
                        }} className="text-blue cursor-pointer f-weight-700 f-20px m-0"><i
                            className="fas fa-chevron-circle-left"/>Go Back</p>
                    </nav>
                    <ReactDataTable
                        tableData={requisitionDetailsTableData}
                        assetList={this.assetList}
                    />
                    <button className='submit-btn-normal' onClick={() => this.setState({printDelivery: true})}>Print
                    </button>
                </> : <ReactDataTable
                    tableData={requisitionTableData}
                    assetList={this.assetList}
                    details
                />}
            </div>
        );
    }
}

export default BranchRequisitionComponent;