import React, {Component} from 'react';
import axios from "axios";
import {apiUrl} from "../../utility/constant";
import jwt from 'jsonwebtoken';
import ReactDataTable from "../../module/data-table-react/ReactDataTable";
import AssetCategoryByUserOption from "../../utility/component/assetCategoryByUserOption";
import AssetSubCategoryByUserOption from "../../utility/component/assetSubCategoryByUserOption";
import Spinner from "../../layouts/Spinner";

class OwnStock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allData: [],
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
        this.getData(user.id);
    }

    getData = id => {
        this.setState({
            isLoading: true
        }, () => {
            axios.post(apiUrl() + 'assets-own-stock/all/by/credentials', {user_id: id})
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
            allData: []
        }, () => {
            axios.post(apiUrl() + 'assets-own-stock/all/by/credentials', {
                user_id: id,
                category_id,
                sub_category_id
            })
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

    validate = () => {
        const {category_id} = this.state;
        let errorObj = {
            category_id: category_id !== ''
        };

        this.setState({errorObj});
        return errorObj;
    };

    render() {
        const {allData, isLoading, category_id, sub_category_id, errorObj} = this.state;
        return (
            <div className="rounded bg-white admin-input-height m-2 p-2">
                <nav className="navbar text-center mb-2 mt-1 pl-2 rounded">
                    <p className="text-blue f-weight-700 f-20px m-0">Own Stock - Product available in my stock</p>
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
                    <div className="col-md-2 h-100 m-0 d-flex">
                        <button type="button" onClick={this.handleSearch} className="submit-btn-normal w-75 h-100">Search</button>
                    </div>
                </div>
                {isLoading ? <Spinner/> : allData.length > 0 ? <>
                        <ReactDataTable
                            dataDisplay
                            footer
                            isLoading
                            pagination
                            searchable
                            tableData={allData}
                        />
                    </> :
                    <h4 className={'no-project px-2'}><i className="icofont-exclamation-circle"></i> Currently There are
                        No Own Stock</h4>}
            </div>
        );
    }
}

export default OwnStock;