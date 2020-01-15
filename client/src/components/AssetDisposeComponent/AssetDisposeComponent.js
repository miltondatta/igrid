import React, {Component} from 'react'

class AssetDisposeComponent extends Component{
    render(){
        return(
            <div className={'row'}>
                <div className="col-md-4 px-3">
                    <div className="bg-white rounded p-2">
                        <nav className="navbar text-center mb-2 pl-2 rounded">
                            <p className="text-dark f-weight-500 f-20px m-0" href="#">Search Product</p>
                        </nav>
                        <div className={'row p-2 align-items-center'}>
                            <div className={'col-5 pr-2'}>Asset Category</div>
                            <div className={'col-7 pl-2'}>
                                <select className={'form-control w-100'}>
                                    <option>Electronics</option>
                                    <option>Auto Mobile</option>
                                    <option>Furnitures</option>
                                </select>
                            </div>
                        </div>
                        <div className={'row p-2 align-items-center'}>
                            <div className={'col-5 pr-2'}>Asset Sub-Category</div>
                            <div className={'col-7 pl-2'}>
                                <select className={'form-control w-100'}>
                                    <option>Laptop</option>
                                    <option>Fan</option>
                                    <option>Printer</option>
                                </select>
                            </div>
                        </div>
                        <div className={'row p-2 align-items-center'}>
                            <div className={'col-5 pr-2'}>Asset Name</div>
                            <div className={'col-7 pl-2'}>
                                <select className={'form-control w-100'}>
                                    <option>Asus</option>
                                    <option>HP</option>
                                    <option>Dell</option>
                                </select>
                            </div>
                        </div>
                        <div className={'row p-2 align-items-center'}>
                            <div className={'col-5 pr-2'}>Order</div>
                            <div className={'col-7 pl-2'}>
                                <select className={'form-control w-100'}>
                                    <option>Id</option>
                                    <option>Name</option>
                                </select>
                            </div>
                        </div>
                        <div className={'row p-2 align-items-center'}>
                            <div className={'col-5 pr-2'}>
                            </div>
                            <div className={'col-7 pl-2'}>
                                <button className="btn px-4 btn-outline-info">Search</button>
                            </div>
                        </div>
                        <div className={'bg-light w-100 p-2'}>
                            <nav className="navbar text-center m-0 p-0 rounded">
                                <p className="text-dark f-weight-500 f-20px m-0" href="#">Product List</p>
                            </nav>
                            <ul className="list-group mt-2">
                                <li className="cursor-pointer text-info list-group-item">ASUS - 101 G3</li>
                                <li className="cursor-pointer text-info list-group-item">Dell Inspiron 2004</li>
                                <li className="cursor-pointer text-info list-group-item">HP Pavilion x360</li>
                                <li className="cursor-pointer text-info list-group-item">Dell Venue 11 Pro (7139)
                                </li>
                                <li className="cursor-pointer text-info list-group-item">Mony count Machine</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={'col-md-8 px-2'}>
                    <div className={'bg-white rounded p-2'}>
                        <nav className="navbar text-center mb-2 pl-2 rounded">
                            <p className="text-dark f-weight-500 f-20px m-0">Asset Dispose Form</p>
                        </nav>
                        <div className={'row p-2 align-items-center'}>
                            <div className={'col-md-5'}>Asset Id :</div>
                            <div className={'col-md-7'}>00001</div>
                        </div>
                        <div className={'row p-2 align-items-center'}>
                            <div className={'col-md-5'}>Asset Tag :</div>
                            <div className={'col-md-7'}>780863185779</div>
                        </div>
                        <div className={'row p-2 align-items-center'}>
                            <div className={'col-md-5'}>Asset Category :</div>
                            <div className={'col-md-7'}>Electronics</div>
                        </div>
                        <div className={'row p-2 align-items-center'}>
                            <div className={'col-md-5'}>Asset Sub-category :</div>
                            <div className={'col-md-7'}>Laptop</div>
                        </div>
                        <div className={'row p-2 align-items-center'}>
                            <div className={'col-md-5'}>Asset Name :</div>
                            <div className={'col-md-7'}>ASUS - 101 G3</div>
                        </div>
                        <div className={'row p-2 align-items-center'}>
                            <div className={'col-md-5'}>Asset Regi Date :</div>
                            <div className={'col-md-7'}>25 July 2013</div>
                        </div>
                        <div className={'row p-2 align-items-center'}>
                            <div className={'col-md-5'}>Vendor :</div>
                            <div className={'col-md-7'}>Flora Ltd</div>
                        </div>
                        <div className={'row p-2 align-items-center'}>
                            <div className={'col-md-5'}>Initial Value :</div>
                            <div className={'col-md-7'}>52000.00</div>
                        </div>
                        <div className={'row p-2 align-items-center'}>
                            <div className={'col-md-5'}>Description :</div>
                            <div className={'col-md-7'}>Aser Lifebok ,AH552</div>
                        </div>
                        <div className={'row p-2 align-items-center'}>
                            <div className={'col-md-5'}>Current Book Value :</div>
                            <div className={'col-md-7'}>52000.00</div>
                        </div>
                        <div className={'row p-2 align-items-center'}>
                            <div className={'col-md-5'}>Date :</div>
                            <div className={'col-md-7'}>
                                <input type="date" className={'form-control w-50'}/>
                            </div>
                        </div>
                        <div className={'row p-2 align-items-center'}>
                            <div className={'col-md-5'}>Cause :</div>
                            <div className={'col-md-7'}>
                                <textarea placeholder={'cause'} className={'form-control w-50'}/>
                            </div>
                        </div>
                        <div className={'row p-2 align-items-center'}>
                            <div className={'col-md-5'}>Attachment  :</div>
                            <div className={'col-md-7'}>
                                <input type="file" className="custom-file-input" />
                                <label className="custom-file-label w-50 ml-3" htmlFor="validatedCustomFile">Choose file...</label>
                            </div>
                        </div>
                        <div className={'row p-2 align-items-center mt-3'}>
                            <div className={'col-md-5'}>
                                <button className={'btn mx-1 px-4 btn-outline-info'}>Submit</button>
                                <button className={'btn mx-1 px-4 btn-outline-warning'}>Clear</button>
                                <button className={'btn mx-1 px-4 btn-outline-danger'}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AssetDisposeComponent