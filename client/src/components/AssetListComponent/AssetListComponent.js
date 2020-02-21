import React, {Component} from 'react'
import ReactDataTable from "../../module/data-table-react/ReactDataTable";

class AssetListComponent extends Component{
    render(){
        const data = [
            {
                asset_Tag: '780863185779',
                title: 'ASUS - 101 G3',
                asset_Category: 'Electronics',
                asset_Type: 'Laptop',
                asset_Reg_Date: '25 July 2013',
                purchage_Value: '52000.00',
                depreciation_Method: 'Straight Line',
                depreciation_Rate: '18%',
                present_Book_Value: '52000.00',
                present_User: 'Nil',
                status: 'Not Assigned'
            },
            {
                asset_Tag: '780863185779',
                title: 'HP - 101 G3',
                asset_Category: 'Electronics',
                asset_Type: 'Laptop',
                asset_Reg_Date: '25 July 2013',
                purchage_Value: '52000.00',
                depreciation_Method: 'Straight Line',
                depreciation_Rate: '18%',
                present_Book_Value: '52000.00',
                present_User: 'Nil',
                status: 'Not Assigned'
            }
        ]
        return(
            <>
                <div className={'bg-white rounded p-2'}>
                    <nav className="navbar navbar-light mb-3 f-weight-500">
                        <p className="navbar-brand m-0">Search Panel</p>
                    </nav>
                    <div className={'row'}>
                        <div className="col-md-4 px-3">
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Asset Tag : </div>
                                <div className={'col-7 pl-2'}>
                                    <input type="text" className={'form-control'} placeholder={'Asset Tag'}/>
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
                    <div className={'row'}>
                        <div className="col-md-4 px-3">
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Location : </div>
                                <div className={'col-7 pl-2'}>
                                    <select className={'form-control w-100'}>
                                        <option>Dhanmondi</option>
                                        <option>Banani</option>
                                        <option>Gulshan</option>
                                        <option>Banasree</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 px-3">
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Building : </div>
                                <div className={'col-7 pl-2'}>
                                    <select className={'form-control w-100'}>
                                        <option>Building 1</option>
                                        <option>Building 2</option>
                                        <option>Building 3</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 px-3">
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Floor : </div>
                                <div className={'col-7 pl-2'}>
                                    <select className={'form-control w-100'}>
                                        <option>First</option>
                                        <option>Fifth</option>
                                        <option>Tenth</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'row'}>
                        <div className="col-md-4 px-3">
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Purchase Value : </div>
                                <div className={'col-7 pl-2'}>
                                    <input type="text" className={'form-control'} placeholder={'Purchase Value'}/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 px-3">
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>To : </div>
                                <div className={'col-7 pl-2'}>
                                    <input type="text" className={'form-control'} placeholder={'To'}/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 px-3">
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Vendor : </div>
                                <div className={'col-7 pl-2'}>
                                    <select className={'form-control w-100'}>
                                        <option>Acer</option>
                                        <option>Flora</option>
                                        <option>Computer Source</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'row'}>
                        <div className="col-md-4 px-3">
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Reg Date : </div>
                                <div className={'col-7 pl-2'}>
                                    <input type="date" className={'form-control w-100'}/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 px-3">
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>To : </div>
                                <div className={'col-7 pl-2'}>
                                    <input type="date" className={'form-control w-100'}/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 px-3">
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>Status : </div>
                                <div className={'col-7 pl-2'}>
                                    <select className={'form-control w-100'}>
                                        <option>Active</option>
                                        <option>Sold</option>
                                        <option>Dispose</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'row'}>
                        <div className="col-md-4 px-3">
                            <div className={'row p-2 align-items-center'}>
                                <div className={'col-5 pr-2'}>
                                    <button className="btn btn-outline-info px-4">Search</button></div>
                                <div className={'col-7 pl-2'}>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'bg-white rounded p-3 mt-4'}>
                    <nav className="navbar navbar-light mb-3 f-weight-500">
                        <p className="navbar-brand m-0">Asset List</p>
                    </nav>
                    <div>
                        <ReactDataTable
                            exportable
                            searchable
                            tableData={data}
                        />
                    </div>
                </div>
            </>
        )
    }
}

export default AssetListComponent