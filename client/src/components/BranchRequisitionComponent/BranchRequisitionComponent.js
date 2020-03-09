import React, {Component} from 'react';
import jwt from 'jsonwebtoken';
import ReactDataTable from "../../module/data-table-react/ReactDataTable";
import axios from "axios";
import {apiUrl} from "../../utility/constant";
import {FrontEnd_BaseUrl} from "../../config/private";

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
        axios.post(apiUrl() + 'my-requisition-details/by/credentials', {user_id: this.state.user.id})
            .then(res => {
                this.setState({
                    viewDetails: true,
                    requisitionDetailsData: res.data[0]
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
                    this.setState({requisitionDetailsTableData});
                })
            })
    };

    printTable = (divName) => {
        let winPrint = window.open('', '', 'width=1024,height=768');
        let css1 = 'https://' + FrontEnd_BaseUrl + '/multiselect.css';
        var full_page = '<html><head><link rel="stylesheet" type="text/css" href="' + css1 + '"  media="all"></head> <body> </body></html>';
        winPrint.document.write(full_page);
        var print_area = document.getElementById(divName).innerHTML;
        winPrint.document.body.innerHTML = print_area;
        winPrint.document.close();
        setTimeout(function () {
            winPrint.focus();
            winPrint.print();
            winPrint.close();
        }, 1000);

        /*document.getElementById(divName).style.display = "block";
        let winPrint = window.open('', '', 'width=1024,height=768');

        /!*let full_page = '<html id="ui-print"><head><link rel="stylesheet" type="text/css" href="'+ print_url +'" media="all"></head> <body> </body></html>';
        winPrint.document.write(full_page);*!/
        winPrint.document.body.innerHTML = document.getElementById(divName).innerHTML;
        document.getElementById(divName).style.display = "none";
        winPrint.document.close();

        setTimeout(function () {
            winPrint.focus();
            winPrint.print();
            winPrint.close();
        }, 1000);*/

    };

    render() {
        const {requisitionTableData, viewDetails, requisitionDetailsData, requisitionDetailsTableData, user} = this.state;

        return (
            <div className={'bg-white rounded p-2 m-3'}>
                <nav className="navbar text-center mb-2 ml-0 pl-2 rounded">
                    <p className="text-blue f-weight-700 f-22px m-0">My Delivery</p>
                </nav>
                {viewDetails ? <>
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
                    <button className='ui-btn' onClick={() => this.printTable('print_div')}>Print
                    </button>
                </> : <ReactDataTable
                    tableData={requisitionTableData}
                    assetList={this.assetList}
                    details
                />}


                <div className={'ui-print'} id='print_div' style={{display: "none"}}>
                    <div className="print-header">
                        <h5>iGrid Requisition Delivery</h5>
                        <strong>Some Branch Name, Gate No, and Other Info</strong>
                        <strong>Location Information</strong>
                    </div>
                    <div className="print-body">
                        <div className="client-info">
                            <div>
                                <p><b>Name: {user.userName}</b></p>
                                <p>
                                    <b>Area: {requisitionDetailsData.length ? requisitionDetailsData[0].location_name : ''}</b>
                                </p>
                            </div>
                            <div>
                                <p><b>Date: {new Date().toLocaleDateString()}</b></p>
                                <p><b>Request
                                    No: {requisitionDetailsData.length ? requisitionDetailsData[0].requisition_no : ''}</b>
                                </p>
                            </div>
                        </div>
                        <div className="delivery-info">
                            <div className={'table'}>
                                <p><b>SL.</b></p>
                                <p><b>Item Name</b></p>
                                <p><b>Quantity</b></p>
                            </div>
                            {requisitionDetailsData.length && requisitionDetailsData.map((item, index) => (
                                <div className={'table'} key={index}>
                                    <p>{index + 1}</p>
                                    <p>{item.brand}_{item.model}</p>
                                    <p>{item.update_quantity}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="print-footer">
                        <p>Signature:</p>
                        <p>Name of Automation Staff:</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default BranchRequisitionComponent;