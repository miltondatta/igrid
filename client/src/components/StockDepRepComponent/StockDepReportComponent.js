import React, {Component} from 'react';
import jwt from "jsonwebtoken";
import axios from "axios";
import {apiUrl} from "../../utility/constant";
import ErrorModal from "../../utility/error/errorModal";
import SuccessModal from "../../utility/success/successModal";
import ReactExcelExport from "../../module/react-excel-export/reactExcelExport";

import TablePdfViewer from "../../module/table-pdf-viewer/tablePdfViewer";
import AssetCategoryByUserOption from "../../utility/component/assetCategoryByUserOption";
import AssetSubCategoryByUserOption from "../../utility/component/assetSubCategoryByUserOption";
import PrimeDataTable from "../../module/dataTableForProject/PrimeDataTable";
import NodataFound from "../../utility/component/nodataFound";

class StockDepReportComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allData: [],
            user: {},
            category_id: '',
            sub_category_id: '',
            errorObj: null,
            isLoading: false,
            searchClicked: false,
        };
    }

    componentDidMount() {
        const user = jwt.decode(localStorage.getItem('user')).data;
        Object.keys(user).length && this.setState({user});
        this.getData(user.id);
    }

    getData = id => {
        this.setState({
            isLoading: true
        }, () => {
            axios.post(apiUrl() + 'assets/depreciation/report', {user_id: id})
                .then(res => {
                    if (res.data.status) {
                        this.setState({
                            allData: res.data.response,
                            isLoading: false
                        })
                    } else {
                        this.setState({
                            error: true,
                            errorMessage: res.data.message,
                            isLoading: false
                        }, () => {
                            setTimeout(() => {
                                this.setState({
                                    error: false,
                                })
                            }, 2300)
                        })
                    }
                })
                .catch(err => {
                    console.log(err.response);
                })
        })
    };

    handleChange = e => {
        const {name, value} = e.target;
        if (value === "") return;

        this.setState({
            [name]: value
        }, () => {
            if (name === 'category_id') this.setState({sub_category_id: ''});
        });
    };

    handleSearch = () => {
        if (Object.values(this.validate()).includes(false)) return false;
        const {category_id, sub_category_id, user: {id}} = this.state;

        this.setState({
            isLoading: true,
            searchClicked: true,
            allData: []
        }, () => {
            axios.post(apiUrl() + 'assets/depreciation/report', {
                user_id: id,
                category_id,
                sub_category_id
            })
                .then(res => {
                    if (res.data.status) {
                        this.setState({
                            allData: res.data.response,
                            isLoading: false
                        })
                    } else {
                        this.setState({
                            error: true,
                            errorMessage: res.data.message,
                            isLoading: false
                        }, () => {
                            setTimeout(() => {
                                this.setState({
                                    error: false,
                                })
                            }, 2300)
                        })
                    }
                })
                .catch(err => {
                    console.log(err.response);
                })
        })
    };

    validate = () => {
        const {category_id} = this.state;
        let errorObj = {
            category_id: category_id !== ''
        };

        this.setState({errorObj});
        return errorObj;
    };

    pdfViewr = () => {
        const {allData} = this.state
        allData.length > 0 && this.setState((prevState) => ({pdf: !prevState.pdf, optionDropDown: false}))
    }

    render() {
        const {error, optionDropDown, errorMessage, category_id, sub_category_id, errorObj, allData, pdf, searchClicked} = this.state;

        return (
            <>
                {error && searchClicked &&
                    <ErrorModal errorMessage={errorMessage} />
                }

                <div className={'rounded m-2 bg-white max-h-80vh ui-report-container px-3'}>
                    <nav className="navbar text-center mb-2 mt-1 pl-2 rounded">
                        <p className="text-blue f-weight-700 f-20px m-0">Stock Depreciation Report</p>
                    </nav>
                    <div className="ui-report-header rounded">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="px-1">
                                    <label className={'ui-custom-label'}>Category</label>
                                    <select name={'category_id'} value={category_id}
                                            onChange={this.handleChange}
                                            className={`ui-custom-input w-100`}>
                                        <option value="">Select Category</option>
                                        <AssetCategoryByUserOption/>
                                    </select>
                                </div>
                                {errorObj && !errorObj.category_id &&
                                <span className="error pl-2">Category Field is required</span>
                                }
                            </div>
                            <div className="col-md-4">
                                <div className="px-1">
                                    <label className={'ui-custom-label'}>Sub Category</label>
                                    <select name={'sub_category_id'} value={sub_category_id}
                                            onChange={this.handleChange}
                                            className={`ui-custom-input w-100`}>
                                        <option value="">Select Sub Category</option>
                                        <AssetSubCategoryByUserOption
                                            category_id={category_id}/>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="ui-report-btn-header rounded p-2">
                                    <button onClick={this.handleSearch} className={'mx-2 w-50 submit-btn-normal'}>Submit</button>
                                    <button className={'mx-2 reset-btn-normal'} onClick={() => {
                                        this.setState({
                                            date_from: '', date_to: ''
                                        })
                                    }}>Reset</button>
                                    <div className={'position-relative'}>
                                        <button onClick={() => {this.setState((prevState) => ({optionDropDown: !prevState.optionDropDown}))}} className={'mx-2 new-btn-normal'}>Export</button>
                                        {optionDropDown && <div className={'ui-dropdown-btn'}>
                                            <button onClick={() => {this.setState((prevState) => ({optionDropDown: !prevState.optionDropDown}))}} className={`${typeof allData !== 'undefined' && (allData.length > 0 ? 'p-0' : null)}`}>{typeof allData !== 'undefined' && (allData.length > 0 ? <ReactExcelExport excelData={allData} /> : 'Excel')}</button>
                                            <button onClick={this.pdfViewr}>PDF</button>
                                        </div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {typeof allData !== 'undefined' && allData.length > 0 ?
                        <PrimeDataTable
                            data={allData}
                        />
                    :  <NodataFound />}
                </div>

                {pdf && <TablePdfViewer pdfViewr={this.pdfViewr} reportTitle={'Stock Report'}  tableData={allData} />}
            </>
        );
    }
}

export default StockDepReportComponent;
