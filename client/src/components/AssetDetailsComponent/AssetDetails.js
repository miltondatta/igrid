import React, {Component} from 'react';
import axios from "axios";
import {apiUrl} from "../../utility/constant";
import jwt from 'jsonwebtoken';
import AssetCategoryByUserOption from "../../utility/component/assetCategoryByUserOption";
import AssetSubCategoryByUserOption from "../../utility/component/assetSubCategoryByUserOption";
import Spinner from "../../layouts/Spinner";
import ReactDataTable from "../../module/data-table-react/ReactDataTable";

class AssetDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allData: [],
            allDetailsTableData: [],
            user: {},
            category_id: '',
            sub_category_id: '',
            errorObj: null,
            isLoading: false
        };
    }

    componentDidMount() {
        const user = jwt.decode(localStorage.getItem('user')).data;
        Object.keys(user).length && this.setState({user});
        Object.keys(user).length && this.getData(user.id);
    }

    getData = id => {
        this.setState({
            isLoading: true
        }, () => {
            axios.post(apiUrl() + 'assets-entry/all/by/credentials', {user_id: id})
                .then(res => {
                    this.setState({
                        allData: res.data[0],
                        isLoading: false
                    }, () => {
                        let allDetailsTableData = [];
                        res.data[0].map(item => {
                            let newObj = {
                                serial: item.product_serial,
                                product: item.product_name,
                                category: item.category,
                                sub_category: item.sub_category,
                                purchase_cost: item.cost_of_purchase,
                                installation_cost: item.installation_cost,
                                carrying_cost: item.carrying_cost,
                                other_cost: item.other_cost,
                                rate: item.rate,
                                effective_date: item.effective_date,
                                book_value: item.book_value,
                                salvage_value: item.salvage_value,
                                useful_life: item.useful_life,
                                warranty: item.warranty,
                                comments: item.comments,
                                condition: item.condition_type
                            };
                            allDetailsTableData.push(newObj);
                        });
                        this.setState({allDetailsTableData});
                    })
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
            allDetailsTableData: []
        }, () => {
            axios.post(apiUrl() + 'assets-entry/all/by/credentials', {
                user_id: id,
                category_id,
                sub_category_id
            })
                .then(res => {
                    this.setState({
                        allData: res.data[0],
                        isLoading: false
                    }, () => {
                        let allDetailsTableData = [];
                        res.data[0].map(item => {
                            let newObj = {
                                serial: item.product_serial,
                                product: item.product_name,
                                category: item.category,
                                sub_category: item.sub_category,
                                purchase_cost: item.cost_of_purchase,
                                installation_cost: item.installation_cost,
                                carrying_cost: item.carrying_cost,
                                other_cost: item.other_cost,
                                rate: item.rate,
                                effective_date: item.effective_date,
                                book_value: item.book_value,
                                salvage_value: item.salvage_value,
                                useful_life: item.useful_life,
                                warranty: item.warranty,
                                comments: item.comments,
                                condition: item.condition_type
                            };
                            allDetailsTableData.push(newObj);
                        });
                        this.setState({allDetailsTableData});
                    })
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

    render() {
        const {isLoading, category_id, sub_category_id, errorObj, allDetailsTableData} = this.state;

        return (
            <div className="rounded admin-input-height bg-white p-2 m-2">
                <nav className="navbar text-center mb-2 mt-1 pl-2 rounded">
                    <p className="text-blue f-weight-700 f-20px m-0">Asset Details</p>
                </nav>
                <div className="row ui-top-category mb-4">
                    <div className="col-md-5">
                        <div className="px-1">
                            <label className={'ui-custom-label'}>Category</label>
                            <select name={'category_id'} value={category_id}
                                    onChange={this.handleChange}
                                    className={`ui-custom-input`}>
                                <option value="">Select Category</option>
                                <AssetCategoryByUserOption/>
                            </select>
                        </div>
                        {errorObj && !errorObj.category_id &&
                        <span className="error pl-2">Category Field is required</span>
                        }
                    </div>
                    <div className="col-md-5">
                        <div className="px-1">
                            <label className={'ui-custom-label'}>Sub Category</label>
                            <select name={'sub_category_id'} value={sub_category_id}
                                    onChange={this.handleChange}
                                    className={`ui-custom-input`}>
                                <option value="">Select Sub Category</option>
                                <AssetSubCategoryByUserOption
                                    category_id={category_id}/>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <button type="button" onClick={this.handleSearch} className="submit-btn-normal w-100 h-100">Search</button>
                    </div>
                </div>
                {isLoading ? <Spinner/> : <>
                    {allDetailsTableData.length > 0 ?
                        <ReactDataTable
                            dataDisplay
                            footer
                            isLoading
                            pagination
                            searchable
                            tableData={allDetailsTableData}
                        />
                        : <h4 className={'no-project px-2'}><i className="icofont-exclamation-circle"></i>
                        Currently There are No Own Stock</h4>}
                </>}
                {/*{isLoading ? <Spinner/> : allDetailsTableData.length > 0 ? <>
                        <ReactDataTable
                            dataDisplay
                            footer
                            isLoading
                            pagination
                            searchable
                            tableData={allDetailsTableData}
                        />
                    </> :
                    <h4 className={'no-project px-2'}><i className="icofont-exclamation-circle"></i>
                        Currently There are No Own Stock</h4>}*/}
            </div>
        );
    }
}

export default AssetDetails;