import React, {Component} from 'react'
import jwt from 'jsonwebtoken';
import AssetCategoryByUserOption from "../../utility/component/assetCategoryByUserOption";
import AssetSubCategoryByUserOption from "../../utility/component/assetSubCategoryByUserOption";
import AssetProductByUserOptions from "../../utility/component/assetProductByUserOptions";
import AssetListByUserOptions from "../../utility/component/assetListByUserOptions";

class AssetDisposalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            category_id: '',
            category_name: '',
            sub_category_id: '',
            sub_category_name: '',
            product_id: '',
            product_name: '',
            product_serial: '',
            disposal_reason: '',
            success: false,
            successMessage: '',
            error: false,
            errorMessage: '',
            errorDict: null,
            isLoading: false,
            disposalData: []
        }
    }

    componentDidMount() {
        const user = jwt.decode(localStorage.getItem('user')).data;
        if (Object.keys(user).length) this.setState({user});
    }

    handleChange = e => {
        const {name, value} = e.target;
        let name_list = ['category_id', 'sub_category_id', 'product_id', 'product_serial'];
        if (name_list.includes(name) && value === '') return false;

        this.setState({
            [name]: value
        }, () => {
            if (name === 'category_id') this.setState({
                sub_category_id: '',
                product_id: '',
                product_serial: ''
            }, () => this.validate());
            if (name === 'sub_category_id') this.setState({product_id: '', product_serial: ''}, () => this.validate());
            if (name === 'product_id') this.setState({product_serial: ''}, () => this.validate());
            this.validate()
        })
    };

    addDisposal = () => {
        if (Object.values(this.validate()).includes(false)) return false;
        const {disposalData} = this.state;
        const newDisposal = this.getFormData();

        this.setState({
            disposalData: [...disposalData, ...newDisposal]
        }, () => this.emptyStateValue())
    };

    getFormData = () => {
        const {
            category_id, sub_category_id, product_id, product_serial, disposal_reason
        } = this.state;

        return [{
            category_id,
            sub_category_id,
            product_id,
            product_serial,
            disposal_reason
        }]
    };

    validate = () => {
        const {
            category_id, sub_category_id, product_id, product_serial, disposal_reason
        } = this.state;

        let errorDict = {
            category_id: category_id !== '',
            sub_category_id: sub_category_id !== '',
            product_id: product_id !== '',
            product_serial: product_serial !== '',
            disposal_reason: disposal_reason !== ''
        };

        this.setState({errorDict});
        return errorDict;
    };

    emptyStateValue = () => {
        this.setState({
            category_id: '',
            sub_category_id: '',
            product_id: '',
            product_serial: '',
            disposal_reason: ''
        });
    };

    render() {
        const {
            category_id, sub_category_id, product_id, product_serial, disposal_reason, success, successMessage, error, errorMessage,
            errorDict, isLoading, disposalData
        } = this.state;


        return (
            <>
                {error &&
                <div
                    className="alert alert-danger mx-3 mt-2 mb-0 position-relative d-flex justify-content-between align-items-center"
                    role="alert">
                    {errorMessage} <i className="fas fa-times " onClick={() => this.setState({error: false})}></i>
                </div>}
                {success &&
                <div
                    className="alert alert-success mx-3 mt-2 mb-0 position-relative d-flex justify-content-between align-items-center"
                    role="alert">
                    {successMessage} <i className="fas fa-times " onClick={() => this.setState({success: false})}></i>
                </div>}
                <div className="px-2 my-2 ui-dataEntry">
                    <div className={`bg-white rounded p-2 min-h-80vh position-relative`}>
                        <nav className="navbar text-center mb-2 pl-2 rounded">
                            <p className="text-blue f-weight-700 f-20px m-0">Asset Disposal</p>
                        </nav>
                        <div className="px-1 mb-2">
                            <label className={'ui-custom-label'}>Category</label>
                            <select name={'category_id'} value={category_id}
                                    onChange={this.handleChange}
                                    className={`ui-custom-input`}>
                                <option value="">Select Category</option>
                                <AssetCategoryByUserOption/>
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
                                <AssetSubCategoryByUserOption
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
                                <AssetProductByUserOptions category_id={category_id} sub_category_id={sub_category_id}/>
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
                                <AssetListByUserOptions category_id={category_id} sub_category_id={sub_category_id}
                                                        product_id={product_id}/>
                            </select>
                            {errorDict && !errorDict.product_serial &&
                            <span className="error">Product Serial Field is required</span>
                            }
                        </div>
                        <div className="px-1 mb-2">
                            <label className={'ui-custom-label'}>Disposal Reason</label>
                            <textarea onChange={this.handleChange} value={disposal_reason}
                                      className="ui-custom-input " name={'disposal_reason'}
                                      placeholder="Disposal Reason"/>
                            {errorDict && !errorDict.disposal_reason &&
                            <span className="error">Disposal Reason Field is required</span>
                            }
                        </div>
                        <button onClick={this.addDisposal} className="submit-btn">Add Disposal</button>
                    </div>
                    <div className="rounded bg-white min-h-80vh p-2">
                        <nav className="navbar text-center mb-2 mt-1 pl-2 rounded">
                            <p className="text-blue f-weight-700 f-20px m-0">Disposal List</p>
                        </nav>
                        {isLoading ? <h2>Loading</h2> : disposalData.length > 0 ? <>
                            {/*<ReactDataTable
                                edit={formType !== 'COMPLAINT'}
                                dataDisplay={formType !== 'COMPLAINT'}
                                footer={formType !== 'COMPLAINT'}
                                isLoading={formType !== 'COMPLAINT'}
                                pagination={formType !== 'COMPLAINT'}
                                searchable={formType !== 'COMPLAINT'}

                                deleteModalTitle={title}
                                del={formType !== 'COMPLAINT' ? getApi : false}
                                tableData={dataTableData}
                                updateEdit={this.updateEdit}
                            />*/}
                        </> : <h4 className={'no-project px-2'}><i className="icofont-exclamation-circle"></i> Currently
                            There are No Disposal Asset</h4>}
                    </div>
                </div>
            </>
        )
    }
}

export default AssetDisposalComponent;