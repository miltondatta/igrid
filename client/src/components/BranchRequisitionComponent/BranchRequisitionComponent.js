import React, {Component} from 'react';
import jwt from 'jsonwebtoken';

import axios from "axios";
import {apiUrl} from "../../utility/constant";
import PrintDelivery from "../DeliveryRequestComponent/PrintDelivery";
import '../../assets/print.css';
import Spinner from "../../layouts/Spinner";
import PrimeDataTable from "../../module/dataTableForProject/PrimeDataTable";

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
                        requisitionData: res.data.resData,
                        isLoading: false
                    }, () => {
                        this.setState({requisitionTableData: res.data.resData});
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
                        requisitionDetailsData: res.data,
                        isLoading: false
                    }, () => {
                        let requisitionDetailsTableData = [];
                        res.data.map(item => {
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

                            res.data.map(item => {
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
            <div className={'bg-white rounded admin-input-height p-2 m-2'}>
                {printDelivery && <PrintDelivery resData={printData} comeBack={this.comeBack}/>}
                <nav className="navbar text-center mb-2 ml-0 pl-2 rounded">
                    {viewDetails ? <p onClick={() => {
                        this.setState({viewDetails: false, requisitionDetailsData: []})
                    }} className="text-blue cursor-pointer f-weight-700 f-20px m-0"><i
                        className="fas fa-chevron-circle-left mr-2"/>Go Back</p> : <p className="text-blue f-weight-700 f-22px m-0">My Delivery</p>}
                </nav>
                {isLoading ? <Spinner/> : viewDetails ? <>
                   {requisitionDetailsTableData.length > 0 && <PrimeDataTable
                        data={requisitionDetailsTableData}
                        assetList={this.assetList}
                    />}
                    <button className='submit-btn-normal mt-3' onClick={() => this.setState({printDelivery: true})}>Print
                    </button>
                </> :
                    requisitionTableData.length > 0 ? <PrimeDataTable
                        data={requisitionTableData}
                        assetList={this.assetList}
                        details
                    /> : <h4 className={'no-project px-2 mt-4'}><i className="icofont-exclamation-circle"></i> Currently There are No Data</h4>
                }
            </div>
        );
    }
}

export default BranchRequisitionComponent;