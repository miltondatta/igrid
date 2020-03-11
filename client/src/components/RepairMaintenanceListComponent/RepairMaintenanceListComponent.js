import React, {Component} from 'react';
import axios from "axios";
import {apiBaseUrl, apiUrl} from "../../utility/constant";
import jwt from 'jsonwebtoken';
import Spinner from "../../layouts/Spinner";
import ReactDataTable from "../../module/data-table-react/ReactDataTable";

class RepairMaintenanceListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allData: [],
            repairMaintenanceTableData: [],
            isLoading: false
        };
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
                        isLoading: false,
                        repairMaintenanceTableData: []
                    }, () => {
                        let repairMaintenanceTableData = [];
                        res.data[0].map(item => {
                            let newObj = {
                                product_serial: item.product_serial,
                                product_name: item.product_name,
                                category_name: item.category_name,
                                sub_category_name: item.sub_category_name,
                                book_value: item.book_value,
                                salvage_value: item.salvage_value,
                                useful_life: item.useful_life,
                                warranty: item.warranty,
                                condition_type: item.condition_type,
                                estimated_cost: item.estimated_cost,
                                details: item.details,
                                file_name: item.file_name
                            };
                            repairMaintenanceTableData.push(newObj);
                        });
                        this.setState({repairMaintenanceTableData});
                    })
                })
                .catch(err => {
                    console.log(err.response);
                })
        })
    };

    fileDownload = file_name => {
        let a = document.createElement('a');
        a.href = apiBaseUrl + file_name;
        a.download = file_name;
        a.target = '_blank';
        a.click();
    };

    render() {
        const {repairMaintenanceTableData, isLoading} = this.state;

        return (
            <div className="rounded bg-white p-2">
                <nav className="navbar text-center mb-2 mt-1 pl-2 rounded">
                    <p className="text-blue f-weight-700 f-20px m-0">Repair & Maintenance Asset - Repair & Maintenance Asset in my stock</p>
                </nav>
                {isLoading ? <Spinner/> : repairMaintenanceTableData.length > 0 ? <>
                        <ReactDataTable
                            dataDisplay
                            footer
                            bigTable
                            isLoading
                            pagination
                            searchable
                            file={this.fileDownload}
                            tableData={repairMaintenanceTableData}
                        />
                    </> :
                    <h4 className={'no-project px-2'}><i className="icofont-exclamation-circle"></i> Currently There are
                        No Repair & Maintenance Asset</h4>}
            </div>
        );
    }
}

export default RepairMaintenanceListComponent;