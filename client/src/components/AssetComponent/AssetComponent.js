import React, {Component} from 'react'
import {
    accessoriesOptions,
    hardwareOptions,
    otherOptions,
    requestOn,
    stationaryOptions
} from "../../utility/constant";
import {withRouter} from 'react-router-dom'

class AssetComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            items: 0,
            request: this.props.match.params.option ? this.props.match.params.option : 0,
            productSet: [],
            quantity: '',
            submitProduct: false
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
        const {request, items, quantity} = this.state
        const productCombination = {request, items, quantity}
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

    render(){
        let tableSet = null
        console.log(this.props)
        const {option} = this.props.match.params
        const {request, items, quantity, productSet, submitProduct} = this.state
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
        tableSet = productSet.map((item, index) => {
            const optionName = item.request === '1' ? hardwareOptions : item.request === '2' ? accessoriesOptions : item.request === '3' ? stationaryOptions : item.request === '4' && otherOptions
            return(
                <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{requestOn[item.request]}</td>
                    <td>{optionName[item.items]}</td>
                    <td>{item.quantity}</td>
                </tr>
            )
        })
        return(
            <div className={'ui-asset-component m-auto justify-content-between'} style={{gridTemplateColumns: submitProduct ? '54% 45%' : '100%'}}>
                <div className={'bg-white p-3 mt-4 rounded shadow'}>
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
                {submitProduct && <div className={'bg-white p-3 mt-4 rounded shadow'}>
                    <nav className="navbar text-center mb-3 p-2 rounded">
                        <p className="text-dark f-weight-500 f-20px m-0">Submit Product</p>
                    </nav>
                    <table className="table table-bordered table-dark">
                        <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Request On</th>
                            <th scope="col">Particular</th>
                            <th scope="col">Quantity</th>
                        </tr>
                        </thead>
                        <tbody>
                            {tableSet}
                        </tbody>
                    </table>
                    <button type="submit" onClick={this.handleSubmit} className="ui-btn">Submit</button>
                </div>}
            </div>
        )
    }
}

export default withRouter(AssetComponent)