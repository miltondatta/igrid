import React, {Component} from 'react';
import axios from "axios";
import {apiUrl} from "../../utility/constant";
import jwt from 'jsonwebtoken';
import AssetCategoryByUserOption from "../../utility/component/assetCategoryByUserOption";
import AssetSubCategoryByUserOption from "../../utility/component/assetSubCategoryByUserOption";
import Spinner from "../../layouts/Spinner";

class AssetDetails extends Component {
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

        this.table_header = [
            "Product Serial",
            "Product",
            "Category",
            "Sub Category",
            "Cost of Purchase",
            "Installation Cost",
            "Carrying Cost",
            "Other Cost",
            "Rate",
            "Effective Date",
            "Last Effective Date",
            "Book Value",
            "Salvage Value",
            "Useful Life",
            "Warranty",
            "Last Warranty Date",
            "Comments",
            "Condition Type"
        ];
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
            isLoading: true
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
        const table_body = allData.length && allData.map((item, index) => (
            <tr key={index}>
                <td>{item.product_serial}</td>
                <td>{item.product_name}</td>
                <td>{item.category_name}</td>
                <td>{item.sub_category_name}</td>
                <td>{item.cost_of_purchase}</td>
                <td>{item.installation_cost}</td>
                <td>{item.carrying_cost}</td>
                <td>{item.other_cost}</td>
                <td>{item.rate}</td>
                <td>{item.effective_date}</td>
                <td>{item.last_effective_date}</td>
                <td>{item.book_value}</td>
                <td>{item.salvage_value}</td>
                <td>{item.useful_life}</td>
                <td>{item.warranty}</td>
                <td>{item.last_warranty_date}</td>
                <td>{item.comments}</td>
                <td>{item.condition_type}</td>
            </tr>
        ));

        const table_header = this.table_header.length && this.table_header.map((item, index) => (
            <th key={index} scope="col">{item}</th>
        ));

        return (
            <div className="rounded bg-white max-h-80vh p-2">
                <nav className="navbar text-center mb-2 mt-1 pl-2 rounded">
                    <p className="text-blue f-weight-700 f-20px m-0">Asset Details</p>
                </nav>
                <div className="row">
                    <div className="col-md-4">
                        <div className="px-1 mb-2">
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
                    <div className="col-md-4">
                        <div className="px-1 mb-2">
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
                    <div className="col-md-4">
                        <button type="button" onClick={this.handleSearch} className="submit-btn-normal">Search</button>
                    </div>
                </div>
                {isLoading ? <Spinner/> : allData.length > 0 ? <>
                        {/*<ReactDataTable
                            dataDisplay
                            footer
                            isLoading
                            pagination
                            searchable
                            tableData={allData}
                        />*/}
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
                        No Own Stock</h4>}
            </div>
        );
    }
}

export default AssetDetails;