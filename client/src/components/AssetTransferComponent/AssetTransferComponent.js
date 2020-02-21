import React,{Component} from 'react'

class AssetTransferComponent extends Component{
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
                            <p className="text-dark f-weight-500 f-20px m-0">Asset Transfer Form</p>
                        </nav>
                        <div className={'row'}>
                            <div className={'col-md-6'}>
                                <div className={'bg-light px-2'}>
                                    <nav className="navbar text-center mb-2 pl-2 rounded">
                                        <p className="text-dark f-weight-500 m-0">Asset Info</p>
                                    </nav>
                                    <div className={'row p-2 align-items-center'}>
                                        <div className={'col-md-5'}>Asset Id :</div>
                                        <div className={'col-md-7'}>00001</div>
                                    </div>
                                    <div className={'row p-2 align-items-center'}>
                                        <div className={'col-md-5'}>Asset Name :</div>
                                        <div className={'col-md-7'}>ASUS - 101 G3</div>
                                    </div>
                                    <div className={'row p-2 align-items-center'}>
                                        <div className={'col-md-5'}>Asset Category :</div>
                                        <div className={'col-md-7'}>Electronics</div>
                                    </div>
                                    <div className={'row p-2 align-items-center'}>
                                        <div className={'col-md-5'}>Asset Sub-category :</div>
                                        <div className={'col-md-7'}>Laptop</div>
                                    </div>
                                </div>
                                <div className={'bg-light px-2 my-3'}>
                                    <nav className="navbar text-center mb-2 pl-2 rounded">
                                        <p className="text-dark f-weight-500 m-0">Transfer From</p>
                                    </nav>
                                    <div className={'row p-2 align-items-center'}>
                                        <div className={'col-md-5'}>User :</div>
                                        <div className={'col-md-7'}>Rakibul Islam</div>
                                    </div>
                                    <div className={'row p-2 align-items-center'}>
                                        <div className={'col-md-5'}>Location :</div>
                                        <div className={'col-md-7'}>Gulshan</div>
                                    </div>
                                    <div className={'row p-2 align-items-center'}>
                                        <div className={'col-md-5'}>Building :</div>
                                        <div className={'col-md-7'}>Building 1</div>
                                    </div>
                                    <div className={'row p-2 align-items-center'}>
                                        <div className={'col-md-5'}>Designation :</div>
                                        <div className={'col-md-7'}>Manager</div>
                                    </div>
                                    <div className={'row p-2 align-items-center'}>
                                        <div className={'col-md-5'}>Cost Center :</div>
                                        <div className={'col-md-7'}>1001</div>
                                    </div>
                                    <div className={'row p-2 align-items-center'}>
                                        <div className={'col-md-5'}>sol :</div>
                                        <div className={'col-md-7'}>102</div>
                                    </div>
                                    <div className={'row p-2 align-items-center'}>
                                        <div className={'col-md-5'}>Issue Date :</div>
                                        <div className={'col-md-7'}>07/07/2014</div>
                                    </div>
                                </div>
                                <div className={'row p-2 align-items-center'}>
                                    <div className={'col-md-5'}>Reason / Comments :</div>
                                    <div className={'col-md-7'}>
                                        <textarea placeholder={'Reason / Comments'} className={'form-control w-100'}/>
                                    </div>
                                </div>
                            </div>
                            <div className={'col-md-6'}>
                                <div className="bg-light px-2">
                                    <div className={'bg-light px-2'}>
                                        <nav className="navbar text-center mb-2 pl-2 rounded">
                                            <p className="text-dark f-weight-500 m-0">Transfer Info</p>
                                        </nav>
                                        <div className={'row p-2 align-items-center'}>
                                            <div className={'col-md-5'}>Transfer To :</div>
                                            <div className={'col-md-7 row '}>
                                                <div className="col-md-6 text-center">
                                                    <input className="form-check-input" type="radio"
                                                           name="exampleRadios" id="exampleRadios3" value="option3"/>
                                                        <label className="form-check-label" htmlFor="exampleRadios3">
                                                            User
                                                        </label>
                                                </div>
                                                <div className="col-md-6 text-center">
                                                    <input className="form-check-input" type="radio"
                                                           name="exampleRadios" id="exampleRadios2" value="option3"/>
                                                        <label className="form-check-label" htmlFor="exampleRadios2">
                                                            Store
                                                        </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={'row p-2 align-items-center'}>
                                            <div className={'col-md-5'}>Employee Id :</div>
                                            <div className={'col-md-7'}>
                                                <input placeholder={'Employee Id'} className={'form-control'} />
                                            </div>
                                        </div>
                                        <div className={'row p-2 align-items-center'}>
                                            <div className={'col-md-5'}>Employee Name :</div>
                                            <div className={'col-md-7'}>
                                                <input placeholder={'Employee Name'} className={'form-control'} />
                                            </div>
                                        </div>
                                        <div className={'row p-2 align-items-center'}>
                                            <div className={'col-md-5'}>Designation :</div>
                                            <div className={'col-md-7'}>
                                                <select className="form-control">
                                                    <option>Manager</option>
                                                    <option>Accountant</option>
                                                    <option>Cashier</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className={'row p-2 align-items-center'}>
                                            <div className={'col-md-5'}>Cost Center :</div>
                                            <div className={'col-md-7'}>
                                                <select className="form-control">
                                                    <option>1001</option>
                                                    <option>1002</option>
                                                    <option>1003</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className={'row p-2 align-items-center'}>
                                            <div className={'col-md-5'}>SOL (Service Outlet Number) :</div>
                                            <div className={'col-md-7'}>
                                                <select className="form-control">
                                                    <option>102</option>
                                                    <option>103</option>
                                                    <option>104</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className={'row p-2 align-items-center'}>
                                            <div className={'col-md-5'}>Location :</div>
                                            <div className={'col-md-7'}>
                                                <select className="form-control">
                                                    <option value="1">Dhanmondi</option>
                                                    <option value="2">Gulshan</option>
                                                    <option value="3">Banani</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className={'row p-2 align-items-center'}>
                                            <div className={'col-md-5'}>Office Type :</div>
                                            <div className={'col-md-7'}>
                                                <select className="form-control">
                                                    <option>Department</option>
                                                    <option>Branch</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className={'row p-2 align-items-center'}>
                                            <div className={'col-md-5'}>Building :</div>
                                            <div className={'col-md-7'}>
                                                <select className="form-control">
                                                    <option value="">Building 1</option>
                                                    <option value="">Building 2</option>
                                                    <option value="">Building 3</option>
                                                    <option value="">Building 4</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className={'row p-2 align-items-center'}>
                                            <div className={'col-md-5'}>Department/Branch :</div>
                                            <div className={'col-md-7'}>
                                                <select className="form-control">
                                                    <option>Dhanmondi</option>
                                                    <option>Banani</option>
                                                    <option>Gulshan</option>
                                                    <option>Banasree</option>
                                                    <option>Motijhil</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className={'row p-2 align-items-center'}>
                                            <div className={'col-md-5'}>Floor :</div>
                                            <div className={'col-md-7'}>
                                                <select className="form-control">
                                                    <option value="4">1st</option>
                                                    <option value="4">2nd</option>
                                                    <option value="4">3rd</option>
                                                    <option value="4">4th</option>
                                                    <option value="4">5th</option>
                                                    <option value="4">6th</option>
                                                    <option value="4">7th</option>
                                                    <option value="4">8th</option>
                                                    <option value="4">9th</option>
                                                    <option value="4">10th</option>
                                                    <option value="4">11th</option>
                                                    <option value="4">12th</option>
                                                    <option value="4">13th</option>
                                                    <option value="4">14th</option>
                                                    <option value="4">15th</option>
                                                    <option value="4">16th</option>
                                                    <option value="4">17th</option>
                                                    <option value="4">18th</option>
                                                    <option value="4">19th</option>
                                                    <option value="4">20th</option>
                                                    <option value="4">21st</option>
                                                    <option value="4">22nd</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className={'row p-2 align-items-center'}>
                                            <div className={'col-md-5'}>Room No :</div>
                                            <div className={'col-md-7'}>
                                                <input placeholder={'Employee Id'} className={'form-control'} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
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

export default AssetTransferComponent