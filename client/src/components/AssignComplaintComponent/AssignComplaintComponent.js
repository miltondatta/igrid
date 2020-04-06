import React, {Component} from 'react';
import axios from "axios";
import {apiUrl} from "../../utility/constant";
import jwt from 'jsonwebtoken';
import Spinner from "../../layouts/Spinner";
import ReactDataTable from "../../module/data-table-react/ReactDataTable";

class AssignComplaintComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allData: [],
            complaintsTableData: [],
            isLoading: false
        };
    }

    componentDidMount() {
        const user = jwt.decode(localStorage.getItem('user')).data;
        Object.keys(user).length && this.getData(user.id);
    }

    getData = id => {
        this.setState({
            isLoading: true
        }, () => {
            axios.post(apiUrl() + 'complaint/all/by/credentials', {assign_to: id})
                .then(res => {
                    this.setState({
                        allData: res.data,
                        isLoading: false
                    }, () => {
                        let complaintsTableData = [];
                        res.data.length > 0 && res.data.map(item => {
                            let newObj = {
                                id: item.id,
                                complaint_no: item.complaint_no,
                                assigned_by: item.assign_to,
                                complaint_name: item.complaint_name,
                                sub_complaint_name: item.sub_complaint_name,
                                problem_details: item.problem_details,
                                product: item.product_name ? item.product_name + '-' + item.product_serial : 'N/A',
                                status_name: item.status_name
                            };
                            complaintsTableData.push(newObj);
                        });
                        this.setState({complaintsTableData});
                    })
                })
                .catch(err => {
                    console.log(err.response);
                })
        })
    };

    docDetails = id => {
        let a = document.createElement('a');
        a.href = process.env.PUBLIC_URL + '/complaint/details/' + id;
        a.target = '_blank';
        a.click();
    };

    render() {
        const {isLoading, complaintsTableData} = this.state;

        return (
            <div className="rounded admin-input-height bg-white p-2 m-2">
                <nav className="navbar text-center mb-2 mt-1 pl-2 rounded">
                    <p className="text-blue f-weight-700 f-20px m-0">My Complaint Status List</p>
                </nav>
                {isLoading ? <Spinner/> : <>
                    {complaintsTableData.length > 0 ?
                        <ReactDataTable
                            dataDisplay
                            footer
                            isLoading
                            pagination
                            searchable
                            tableData={complaintsTableData}
                            docDetails={this.docDetails}
                        />
                        : <h4 className={'no-project px-2'}><i className="icofont-exclamation-circle"></i>
                            Currently There are No Complaint!</h4>}
                </>}
            </div>
        );
    }
}

export default AssignComplaintComponent;