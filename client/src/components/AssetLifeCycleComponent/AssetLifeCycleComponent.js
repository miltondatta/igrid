import React, {Component} from 'react'
import axios from "axios";
import {apiUrl} from "../../utility/constant";
import AssetCategoryOptions from "../../utility/component/assetCategoryOptions";
import AssetListByCategoryOptions from "../../utility/component/assetListByCategoryOptions";
import AssetListCategorySubCategoryOptions from "../../utility/component/assetListCategorySubCategoryOptions";
import AssetListByCategorySubCategoryProductOptions from "../../utility/component/assetListByCategorySubCategoryProductOptions";
import ErrorModal from "../../utility/error/errorModal";
import Spinner from "../../layouts/Spinner";
import PrimeDataTable from "../../module/dataTableForProject/PrimeDataTable";

class AssetLifeCycleComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category_id: '',
            sub_category_id: '',
            product_id: '',
            product_serial: '',
            success: false,
            successMessage: '',
            error: false,
            errorMessage: '',
            errorDict: null,
            isLoading: false,
            assetLifeCycleData: [],
            assetRepairMaintenanceTableData: []
        };
    }

    handleChange = e => {
        const {name, value} = e.target;
        let name_list = ['category_id', 'sub_category_id', 'product_id', 'product_serial'];
        if (name_list.includes(name) && value === '') return false;

        this.setState({
            [name]: value
        }, () => {
            if (name === 'category_id') this.setState({sub_category_id: '', product_id: '', product_serial: ''}, () => this.validate());
            if (name === 'sub_category_id') this.setState({product_id: '', product_serial: ''}, () => this.validate());
            if (name === 'product_id') this.setState({product_serial: ''}, () => this.validate());
            this.validate()
        })
    };

    handleSubmit = () => {
        if (Object.values(this.validate()).includes(false)) return;
        const {product_serial} = this.state;

        axios.get(apiUrl() + 'asset/lifecycle/details/' + product_serial)
            .then(res => {
                this.setState({
                    assetLifeCycleData: [],
                    assetRepairMaintenanceTableData: []
                }, () => {
                    const assetRepairMaintenanceTableData = res.data[0].asset_repair_maintenance.length > 0 ? res.data[0].asset_repair_maintenance.map(item => {
                        return {
                            id: item.id,
                            location: item.location_name,
                            designation: item.role_name,
                            user: item.user,
                            cost: item.estimated_cost,
                            details: item.details,
                            file_name: item.file_name
                        };
                    }) : [];
                    this.setState({
                        assetLifeCycleData: res.data[0],
                        assetRepairMaintenanceTableData: assetRepairMaintenanceTableData
                    });
                })
            })
            .catch(err => {
                const {error, msg} = err.response.data;
                if (msg) {
                    this.setState({
                        error: error,
                        errorMessage: error && msg
                    }, () => {
                        setTimeout(() => {
                            this.setState({
                                error: false
                            })
                        }, 2300);
                    })
                }
                console.log(err.response);
            })
    };

    validate = () => {
        const {
            category_id, sub_category_id, product_id, product_serial
        } = this.state;

        let errorDict = {
            category_id: category_id !== '',
            sub_category_id: sub_category_id !== '',
            product_id: product_id !== '',
            product_serial: product_serial !== ''
        };

        this.setState({errorDict});
        return errorDict;
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
                        error: error,
                        errorMessage: error && msg
                    }, () => {
                        setTimeout(() => {
                            this.setState({error: false});
                        }, 2300);
                    })
                }
                console.log(err.response);
            })
    };

    render() {
        const {
            category_id, sub_category_id, product_id, product_serial, error, errorMessage, errorDict, isLoading, assetLifeCycleData, assetRepairMaintenanceTableData} = this.state;

        return (
            <>
                {error &&
                <ErrorModal errorMessage={errorMessage}/>
                }
                <div className="px-2 my-2 ui-dataEntry">
                    <div className={`bg-white rounded p-2 admin-input-height position-relative`}>
                        <nav className="navbar text-center mb-2 pl-2 rounded">
                            <p className="text-blue f-weight-700 f-20px m-0">Asset Life Cycle</p>
                        </nav>
                        <div className="px-1 mb-2">
                            <label className={'ui-custom-label'}>Category</label>
                            <select name={'category_id'} value={category_id}
                                    onChange={this.handleChange}
                                    className={`ui-custom-input`}>
                                <option value="">Select Category</option>
                                <AssetCategoryOptions/>
                            </select>
                            {errorDict && !errorDict.category_id &&
                            <span className="error">Category Field is required</span>
                            }
                        </div>
                        <div className="px-1 mb-2">
                            <label className={'ui-custom-label'}>Sub Category</label>
                            <select name={'sub_category_id'} value={sub_category_id}
                                    onChange={this.handleChange}
                                    className={`ui-custom-input`}>
                                <option value="">Select Sub Category</option>
                                <AssetListByCategoryOptions
                                    category_id={category_id}/>
                            </select>
                            {errorDict && !errorDict.sub_category_id &&
                            <span className="error">Sub Category Field is required</span>
                            }
                        </div>
                        <div className="px-1 mb-2">
                            <label className={'ui-custom-label'}>Product</label>
                            <select name={'product_id'} value={product_id}
                                    onChange={this.handleChange}
                                    className={`ui-custom-input`}>
                                <option value="">Select Product</option>
                                <AssetListCategorySubCategoryOptions category_id={category_id} sub_category_id={sub_category_id}/>
                            </select>
                            {errorDict && !errorDict.product_id &&
                            <span className="error">Product Field is required</span>
                            }
                        </div>
                        <div className="px-1 mb-2">
                            <label className={'ui-custom-label'}>Product Serial</label>
                            <select name={'product_serial'} value={product_serial}
                                    onChange={this.handleChange}
                                    className={`ui-custom-input`}>
                                <option value="">Select Product Serial</option>
                                <AssetListByCategorySubCategoryProductOptions category_id={category_id} sub_category_id={sub_category_id}
                                                        product_id={product_id}/>
                            </select>
                            {errorDict && !errorDict.product_serial &&
                            <span className="error">Product Serial Field is required</span>
                            }
                        </div>
                        <button onClick={this.handleSubmit} className="submit-btn-normal mt-5">Search Asset</button>
                    </div>
                    <div className="rounded bg-white admin-input-height position-relative ui-overflow p-2">
                        <nav className="navbar pl-2 asset-life-cycle-list-nav">
                            <p className="f-weight-500 f-20px m-0 text-light"><i className="icofont-spinner-alt-3"/> Asset Life Cycle</p>
                        </nav>
                        <ul className={'ul-list-unstyled asset-life-cycle-list asset-life-cycle-list-basic ml-3'}>
                            <li> <span className={'font-weight-bold'}>-</span> Cost Of Purchase {assetLifeCycleData.cost_of_purchase ? <><span className={'font-weight-bold'}>=</span> {assetLifeCycleData.cost_of_purchase ? assetLifeCycleData.cost_of_purchase : 'N/A'}</> : ''}</li>
                            <li> <span className={'font-weight-bold'}>-</span> Installation Cost {assetLifeCycleData.installation_cost ? <><span className={'font-weight-bold'}>=</span> {assetLifeCycleData.installation_cost ? assetLifeCycleData.installation_cost : 'N/A'}</> : ''}</li>
                            <li> <span className={'font-weight-bold'}>-</span> Carrying Cost {assetLifeCycleData.carrying_cost ? <><span className={'font-weight-bold'}>=</span> {assetLifeCycleData.carrying_cost ? assetLifeCycleData.carrying_cost : 'N/A'}</> : ''}</li>
                            <li> <span className={'font-weight-bold'}>-</span> Other Cost {assetLifeCycleData.other_cost ? <><span className={'font-weight-bold'}>=</span> {assetLifeCycleData.other_cost ? assetLifeCycleData.other_cost : 'N/A'}</> : ''}</li>
                            <li> <span className={'font-weight-bold'}>-</span> Asset Type {assetLifeCycleData.asset_type ? <><span className={'font-weight-bold'}>=</span> {assetLifeCycleData.asset_type ? assetLifeCycleData.asset_type : 'N/A'}</> : ''}</li>
                            <li> <span className={'font-weight-bold'}>-</span> Depreciation Method {assetLifeCycleData.depreciation_method ? <><span className={'font-weight-bold'}>=</span> {assetLifeCycleData.depreciation_method ? assetLifeCycleData.depreciation_method : 'N/A'}</> : ''}</li>
                            <li> <span className={'font-weight-bold'}>-</span> Rate {assetLifeCycleData.rate ? <><span className={'font-weight-bold'}>=</span> {assetLifeCycleData.rate ? assetLifeCycleData.rate : 'N/A'}</> : ''}</li>
                            <li> <span className={'font-weight-bold'}>-</span> Initial Book Value {assetLifeCycleData.book_value ? <><span className={'font-weight-bold'}>=</span> {assetLifeCycleData.book_value ? assetLifeCycleData.book_value : 'N/A'}</> : ''}</li>
                            <li> <span className={'font-weight-bold'}>-</span> Book Value After Depreciation {assetLifeCycleData.warranty ? <><span className={'font-weight-bold'}>=</span> {assetLifeCycleData.book_value_after_depreciation ? assetLifeCycleData.book_value_after_depreciation : 'N/A'}</> : ''}</li>
                            <li> <span className={'font-weight-bold'}>-</span> Warranty Have {assetLifeCycleData.warranty ? <><span className={'font-weight-bold'}>=</span> {assetLifeCycleData.warranty ? assetLifeCycleData.warranty : 'N/A'}</> : ''}</li>
                        </ul>

                        <nav className="navbar pl-2 asset-life-cycle-deliver-list-nav">
                            <p className="f-weight-500 f-20px m-0 text-light"><i className="icofont-clock-time"/> Deliver History</p>
                        </nav>
                        <ul className={'ul-list-unstyled asset-life-cycle-deliver-list asset-life-cycle-list-basic ml-3'}>
                            <li> <i className="icofont-location-pin"/> Deliver From {assetLifeCycleData.asset_delivery !== undefined ? <><span className={'font-weight-bold'}>-</span> {assetLifeCycleData.asset_delivery.deliver_from ? assetLifeCycleData.asset_delivery.deliver_from : 'N/A'}</> : ''}</li>
                            <li> <i className="icofont-location-pin"/> Deliver To {assetLifeCycleData.asset_delivery !== undefined ? <><span className={'font-weight-bold'}>-</span> {assetLifeCycleData.asset_delivery.deliver_to ? assetLifeCycleData.asset_delivery.deliver_to : 'N/A'}</> : ''}</li>
                        </ul>

                        <nav className="navbar pl-2 asset-life-cycle-transfer-list-nav">
                            <p className="f-weight-500 f-20px m-0 text-light"><i className="fas fa-arrows-alt-h"/> Transfer History</p>
                        </nav>
                        <ul className={'ul-list-unstyled asset-life-cycle-transfer-list asset-life-cycle-list-basic ml-3'}>
                            {assetLifeCycleData.asset_transfer !== undefined ? assetLifeCycleData.asset_transfer.length > 0 && assetLifeCycleData.asset_transfer.map((item, index) => (
                                <React.Fragment key={index}>
                                    <li><i className="icofont-location-pin"/> Transfer From {item.transfer_from !== undefined ? <><span className={'font-weight-bold'}>-</span> {item.transfer_from}</> : ''}</li>
                                    <li><i className="icofont-location-pin"/> Transfer To {item.transfer_to !== undefined ? <><span className={'font-weight-bold'}>-</span> {item.transfer_to}</> : ''}</li>
                                </React.Fragment>
                            )) :
                                <div>
                                    <li><i className="icofont-location-pin"/> Transfer From</li>
                                    <li><i className="icofont-location-pin"/> Transfer To</li>
                                </div>
                            }
                        </ul>

                        <nav className="navbar pl-2 asset-life-cycle-repair-list-nav">
                            <p className="f-weight-500 f-20px m-0 text-light"><i className="icofont-ui-settings"/> Maintenance & Repair</p>
                        </nav>
                        {isLoading ? <Spinner/> : assetRepairMaintenanceTableData.length > 0 ? <>
                            <PrimeDataTable
                                data={assetRepairMaintenanceTableData}
                                file={this.fileDownload}
                            />
                        </> : <h4 className={'no-project px-2 mt-2'}><i className="icofont-exclamation-circle"/> Currently There are No Maintenance & Repair Asset</h4>}
                    </div>
                </div>
            </>
        )
    }
}

export default AssetLifeCycleComponent;