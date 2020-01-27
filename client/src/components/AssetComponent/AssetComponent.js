import React, {Component} from 'react'
import {
    accessoriesOptions,
    hardwareOptions,
    otherOptions,
    requestOn,
    stationaryOptions
} from "../../utility/constant";
import {withRouter} from 'react-router-dom'
import DataTable from "react-data-table-component";

const FilterOption = (props) => {
    return(
        <div>
            <input onChange={props.handleFilter} className={'rounded p-2 border'} placeholder={'Filter By Title'} />
        </div>
    )
}

class AssetComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            items: 0,
            quantity: '',
            productSet: [],
            filterText: '',
            submitProduct: false,
            request: this.props.match.params.option ? this.props.match.params.option : 0,
        }
    }

    handleChange = (e) => {
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const {request, items, quantity, productSet} = this.state
        const length = productSet.length
        const productCombination = {
            id: length + 1,
            request_name: requestOn[request],
            item_name: request === 1 ? hardwareOptions[items] : request === 2 ? accessoriesOptions[items] : request === 3 ? stationaryOptions[items] : request === 4 && otherOptions[items],
            request,
            items,
            quantity
        }
        if (request !== 0 && items !== 0 && quantity !== '') {
            this.setState((prevState) => ({
                productSet: [...prevState.productSet, productCombination],
                submitProduct: true,
                quantity: '',
                request: 0,
                items: 0,
            }))
        }
    }

    handleFilter = (e) => {
        const {value} = e.target
        this.setState({
            filterText: value
        }, () => {
            console.log(this.state.filterText)
        })
    }

    render(){
        const columns = [
            {
                name: 'No',
                selector: 'id',
                sortable: true,
            },
            {
                name: 'Request On',
                selector: 'request_name',
                sortable: true,
                right: true,
            },
            {
                name: 'Item Name',
                selector: 'items',
                sortable: true,
                right: true,
            },
            {
                name: 'Quantity',
                selector: 'quantity',
                sortable: true,
                right: true,
            }
        ];
        const {option} = this.props.match.params
        const {request, items, quantity, productSet, submitProduct, filterText} = this.state
        const accessoriesData = Object.keys(accessoriesOptions).map((items, index) => {
            return(
                <option key={index} value={items}>{accessoriesOptions[items]}</option>
            )
        })
        const stationaryData = Object.keys(stationaryOptions).map((items, index) => {
            return(
                <option key={index} value={items}>{stationaryOptions[items]}</option>
            )
        })
        const hardwareData = Object.keys(hardwareOptions).map((items, index) => {
            return(
                <option key={index} value={items}>{hardwareOptions[items]}</option>
            )
        })
        const otherData = Object.keys(otherOptions).map((items, index) => {
            return(
                <option key={index} value={items}>{otherOptions[items]}</option>
            )
        })
        const filteredData = productSet.filter((item) => item.items.includes(filterText))

        return(
            <div className={'ui-asset-component m-auto justify-content-between'}>
                <div className={'bg-white p-3 rounded shadow'}>
                    <nav className="navbar text-center mb-3 p-2 rounded">
                        <p className="text-dark f-weight-500 f-20px m-0" href="#">Add Product</p>
                    </nav>
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="requeston">Request On</label>
                                <select onChange={this.handleChange} className="form-control" id="requeston" value={request} name={'request'}>
                                    <option value={0}>--Select--</option>
                                    <option value={1}>Hardware</option>
                                    <option value={2}>Accessories</option>
                                    <option value={3}>Stationary</option>
                                    <option value={4}>Others</option>
                                </select>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="itemname">Item Name</label>
                                <select onChange={this.handleChange} className="form-control" id="itemname" value={items} name={'items'}>
                                    <option value={0}>--Select Items--</option>
                                    {request === '1' ? hardwareData : request === '2' ? accessoriesData : request === '3' ? stationaryData : request === '4' ? otherData : ''}
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputAddress">Quantity</label>
                            <input onChange={this.handleChange} value={quantity} type="number" className="form-control" name={'quantity'} id="inputAddress" placeholder="Quantity" />
                        </div>
                        <button type="submit" onClick={this.handleSubmit} className="ui-btn">Add Product</button>
                    </form>
                </div>
                <div className={'bg-white p-3 rounded shadow'}>
                    <nav className="navbar text-center mb-3 p-2 rounded">
                        <p className="text-dark f-weight-500 f-20px m-0">Submit Product</p>
                    </nav>
                    <DataTable
                        striped={true}
                        noHeader={true}
                        subHeader={true}
                        responsive={true}
                        columns={columns}
                        pagination={true}
                        theme={'solarized'}
                        highlightOnHover={true}
                        className={'ui-react-table'}
                        data={filterText !== '' ? filteredData : productSet}
                        actions={<button className={'btn btn-primary'}>Action</button>}
                        subHeaderComponent={productSet.length > 0 && <FilterOption handleFilter={this.handleFilter}/>}
                    />
                    {submitProduct && <button type="submit" onClick={this.handleSubmit} className="ui-btn">Submit</button>}
                </div>
            </div>
        )
    }
}

export default withRouter(AssetComponent)