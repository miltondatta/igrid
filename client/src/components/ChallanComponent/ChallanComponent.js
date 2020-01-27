import Axios from "axios";
import React, {Component} from 'react';
import {apiUrl} from "../../utility/constant";
import ReactDataTable from "../../module/data-table-react/ReactDataTable";

class ChallanComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            challans: [],
            assets: []
        }
    }

    componentDidMount() {
        this.getChallanData()
    }

    getChallanData = () => {
        Axios.get(apiUrl() + 'asset-entry/challan')
            .then(resData => {
                this.setState({
                    challans: resData.data
                })
            })
    }

    assetList = (id) => {
        console.log(id)
        Axios.get(apiUrl() + 'asset-entry/assets/' + id)
            .then(resData => {
                this.setState({
                    challans: [],
                    assets: resData.data
                })
            })
    }

    render() {
        const {challans, assets} = this.state
        return (
            <div className={'w-100 p-2'}>
                <div className="bg-white rounded">
                    <nav className="navbar navbar-light mb-3 f-weight-500">
                        <p className="navbar-brand m-0">Challan Information</p>
                    </nav>
                    <div className="px-4">
                        {assets.length > 0 ? <ReactDataTable
                            pagination
                            searchable
                            tableData={assets}
                        /> : challans.length > 0 && assets.length === 0 && <ReactDataTable
                            details
                            pagination
                            searchable
                            assetList={this.assetList}
                            tableData={challans}
                        />}
                    </div>
                </div>
            </div>
        );
    }
}

export default ChallanComponent;