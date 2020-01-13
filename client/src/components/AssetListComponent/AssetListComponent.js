import React, {Component} from 'react'

class AssetListComponent extends Component{
    render(){
        return(
            <div className={'bg-white rounded p-2'}>
                <nav className="navbar navbar-light mb-3 f-weight-500">
                    <p className="navbar-brand m-0">Search Panel</p>
                </nav>
                <div className={'row'}>
                    <div className="col-md-4 px-3">
                        <div>
                            <div className={'row p-2 align-items-center'}>
                                        <div className={'col-5 pr-2'}>Asset Tag : </div>
                                        <div className={'col-7 pl-2'}>
                                            <input type="text" className={'form-control'} placeholder={'Asset Tag'}/>
                                        </div>
                                    </div>
                        </div>
                    </div>
                    <div className="col-md-4 px-3">
                        <div>
                            <div className={'row p-2 align-items-center'}>
                                        <div className={'col-5 pr-2'}>Asset Category: </div>
                                        <div className={'col-7 pl-2'}>
                                            <select className={'form-control w-100'}>
                                                <option>Electronics</option>
                                                <option>Auto Mobile</option>
                                                <option>Furniture</option>
                                            </select>
                                        </div>
                                    </div>
                        </div>
                    </div>
                    <div className="col-md-4 px-3">
                        <div>
                            <div className={'row p-2 align-items-center'}>
                                        <div className={'col-5 pr-2'}>Asset Sub Category : </div>
                                        <div className={'col-7 pl-2'}>
                                            <select className={'form-control w-100'}>
                                                <option>Car</option>
                                                <option>Laptop</option>
                                                <option>Table</option>
                                            </select>
                                        </div>
                                    </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AssetListComponent