import React, {Component} from 'react';
import axios from "axios";
import {apiUrl, apiBaseUrl} from "../../utility/constant";
import jwt from 'jsonwebtoken';
import Spinner from "../../layouts/Spinner";

class RepairMaintenanceListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allData: [],
            isLoading: false
        };

        this.table_header = [
            "Product Serial",
            "Product",
            "Category",
            "Sub Category",
            "Book Value",
            "Salvage Value",
            "Useful Life",
            "Warranty",
            "Condition Type",
            "Estimated Cost",
            "Details",
            "File"
        ];
    }

    componentDidMount() {
        const {id} = jwt.decode(localStorage.getItem('user')).data;
        this.getData(id);
    }

    getData = id => {
        this.setState({
            isLoading: true
        }, () => {
            axios.post(apiUrl() + 'asset-repair/all/by/credentials', {added_by: id})
                .then(res => {
                    this.setState({
                        allData: res.data[0],
                        isLoading: false
                    })
                })
                .catch(err => {
                    console.log(err.response);
                })
        })
    };

    render() {
        const {allData, isLoading} = this.state;
        const table_body = allData.length && allData.map((item, index) => (
            <tr key={index}>
                <td>{item.product_serial}</td>
                <td>{item.product_name}</td>
                <td>{item.category_name}</td>
                <td>{item.sub_category_name}</td>
                <td>{item.book_value}</td>
                <td>{item.salvage_value}</td>
                <td>{item.useful_life}</td>
                <td>{item.warranty}</td>
                <td>{item.condition_type}</td>
                <td>{item.estimated_cost}</td>
                <td>{item.details}</td>
                <td>
                    <a href={apiBaseUrl + item.file_name} download target="_blank">{item.file_name}</a>
                </td>
            </tr>
        ));

        const table_header = this.table_header.length && this.table_header.map((item, index) => (
            <th key={index} scope="col">{item}</th>
        ));

        return (
            <div className="rounded bg-white min-h-80vh p-2">
                <nav className="navbar text-center mb-2 mt-1 pl-2 rounded">
                    <p className="text-blue f-weight-700 f-20px m-0">Repair & Maintenance Asset - Repair & Maintenance Asset in my stock</p>
                </nav>
                {isLoading ? <Spinner/> : allData.length > 0 ? <>
                        <table className="table table-bordered table-responsive">
                            <thead>
                            <tr>
                                {table_header}
                            </tr>
                            </thead>
                            <tbody>
                            {table_body}
                            </tbody>
                        </table>
                    </> :
                    <h4 className={'no-project px-2'}><i className="icofont-exclamation-circle"></i> Currently There are
                        No Repair & Maintenance Asset</h4>}
            </div>
        );
    }
}

export default RepairMaintenanceListComponent;