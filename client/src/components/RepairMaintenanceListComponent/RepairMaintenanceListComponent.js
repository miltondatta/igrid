import React, {Component} from 'react';
import axios from "axios";
import {apiBaseUrl, apiUrl} from "../../utility/constant";
import jwt from 'jsonwebtoken';
import Spinner from "../../layouts/Spinner";

import ErrorModal from "../../utility/error/errorModal";
import PrimeDataTable from "../../module/dataTableForProject/PrimeDataTable";
import NodataFound from "../../utility/component/nodataFound";

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
                                category: item.category,
                                sub_category: item.sub_category,
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

    fileDownload = (e, file_name) => {
        e.preventDefault();
        axios.get(apiUrl() + 'asset-repair/download/' + file_name)
            .then(() => {
                const link = document.createElement('a');
                link.href = apiUrl() + 'asset-repair/download/' + file_name;
                link.setAttribute('download', file_name);
                link.click();
            })
            .catch(err => {
                const {error, msg} = err.response.data;
                if (msg) {
                    this.setState({
                        fileError: error,
                        fileErrorMessage: error && msg
                    }, () => {
                        setTimeout(() => {
                            this.setState({fileError: false});
                        }, 2300);
                    })
                }
                console.log(err.response);
            })
    };

    render() {
        const {repairMaintenanceTableData, isLoading, fileError, fileErrorMessage} = this.state;

        return (
            <div className="rounded bg-white p-2  admin-input-height m-2">
                {fileError && <ErrorModal errorMessage={fileErrorMessage} />}
                <nav className="navbar text-center mb-2 mt-1 pl-2 rounded">
                    <p className="text-blue f-weight-700 f-20px m-0">Repair & Maintenance Asset - Repair & Maintenance Asset in my stock</p>
                </nav>
                {isLoading ? <Spinner/> : repairMaintenanceTableData.length > 0 ? <>
                        <PrimeDataTable
                            file={this.fileDownload}
                            data={repairMaintenanceTableData}
                        />
                    </> :
                    <NodataFound />}
            </div>
        );
    }
}

export default RepairMaintenanceListComponent;
