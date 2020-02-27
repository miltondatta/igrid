import React, {Component} from 'react';
import axios from "axios";
import {apiUrl} from "../../utility/constant";
import jwt from 'jsonwebtoken';
import ReactDataTable from "../../module/data-table-react/ReactDataTable";

class OwnStock extends Component {
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
        const {id} = jwt.decode(localStorage.getItem('user')).data;
        this.getData(id);
    }

    getData = id => {
        this.setState({
            isLoading: true
        }, () => {
            axios.get(apiUrl() + 'assets-entry/all/' + id)
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
            <div className="rounded bg-white min-h-80vh p-2">
                <nav className="navbar text-center mb-2 mt-1 pl-2 rounded">
                    <p className="text-blue f-weight-700 f-20px m-0">Own Stock - Product available in my stock</p>
                </nav>
                {isLoading ? <h2>Loading</h2> : allData.length > 0 ? <>
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

export default OwnStock;