import React, {Component} from 'react';
import axios from "axios";
import {apiUrl} from "../../utility/constant";
import jwt from 'jsonwebtoken';
import Spinner from "../../layouts/Spinner";

import PrimeDataTable from "../../module/dataTableForProject/PrimeDataTable";
import NodataFound from "../../utility/component/nodataFound";

class DisposalAssetListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allData: [],
            disposalListTableData: [],
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
            axios.post(apiUrl() + 'assets-entry/all/by/credentials', {user_id: id, is_disposal: true})
                .then(res => {
                    this.setState({
                        allData: res.data[0],
                        isLoading: false,
                        disposalListTableData: []
                    }, () => {
                        let disposalListTableData = [];
                        res.data[0].map(item => {
                            let newObj = {
                                product_serial: item.product_serial,
                                product_name: item.product_name,
                                category: item.category,
                                sub_category: item.sub_category,
                                cost_of_purchase: item.cost_of_purchase,
                                installation_cost: item.installation_cost,
                                carrying_cost: item.carrying_cost,
                                other_cost: item.other_cost,
                                rate: item.rate,
                                effective_date: item.effective_date,
                                last_effective_date: item.last_effective_date,
                                book_value: item.book_value,
                                salvage_value: item.salvage_value,
                                useful_life: item.useful_life,
                                warranty: item.warranty,
                                last_warranty_date: item.last_warranty_date,
                                disposal_reason: item.disposal_reason,
                                condition_type: item.condition_type
                            };
                            disposalListTableData.push(newObj);
                        });
                        this.setState({disposalListTableData});
                    })
                })
                .catch(err => {
                    console.log(err.response);
                })
        })
    };

    render() {
        const {isLoading, disposalListTableData} = this.state;

        return (
            <div className="rounded bg-white admin-input-height p-2 m-2">
                <nav className="navbar text-center mb-2 mt-1 pl-2 rounded">
                    <p className="text-blue f-weight-700 f-20px m-0">Disposal Asset - Asset disposed in my stock</p>
                </nav>
                {isLoading ? <Spinner/> : disposalListTableData.length > 0 ? <>
                        <PrimeDataTable
                            data={disposalListTableData}
                        />
                    </> :
                    <NodataFound />}
            </div>
        );
    }
}

export default DisposalAssetListComponent;
