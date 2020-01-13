import QRCode from 'qrcode.react'
import React, {Component} from 'react';

class AssetRegComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            genQr: false
        }
    }

    handleChange = (e) => {
        const {name, value} = e.target
        if(name === 'genQr'){
            this.setState({
                genQr: !this.state.genQr
            }, () => {
                console.log(this.state.genQr)
            })
        } else {
            this.setState({
                [name]: value
            })
        }
    }

    render() {
        const {genQr} = this.state
        let x = {1: 'hello'}
        return (
            <div>
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
                    <div className="col-md-8 pl-1 pr-3">
                        <div className="bg-white rounded p-2">
                            <nav className="navbar text-center mb-2 pl-2 rounded">
                                <p className="text-dark f-weight-500 f-20px m-0">Stock Registration</p>
                            </nav>
                            <div className="row">
                                <div className="col-md-6 pr-2">
                                    <div className={'row p-2 align-items-center'}>
                                        <div className={'col-5 pr-2'}>Asset Id</div>
                                        <div className={'col-7 pl-2'}>
                                            <input type="text" placeholder={'Asset Id'} className={'form-control w-100'}/>
                                        </div>
                                    </div>
                                    <div className={'row p-2 align-items-center'}>
                                        <div className={'col-5 pr-2'}>Asset Name</div>
                                        <div className={'col-7 pl-2'}>
                                            <input type="text" placeholder={'Asset Name'} className={'form-control w-100'}/>
                                        </div>
                                    </div>
                                    <div className={'row p-2 align-items-center'}>
                                        <div className={'col-5 pr-2'}>Description</div>
                                        <div className={'col-7 pl-2'}>
                                            <textarea placeholder={'Description'} className={'form-control w-100'}/>
                                        </div>
                                    </div>
                                    <div className={'row p-2 align-items-center'}>
                                        <div className={'col-5 pr-2'}>Asset Category</div>
                                        <div className={'col-7 pl-2'}>
                                            <input type="text" placeholder={'Asset Category'}
                                                   className={'form-control w-100'}/>
                                        </div>
                                    </div>
                                    <div className={'row p-2 align-items-center'}>
                                        <div className={'col-5 pr-2'}>Asset Sub-category</div>
                                        <div className={'col-7 pl-2'}>
                                            <input type="text" placeholder={'Asset Sub-category'}
                                                   className={'form-control w-100'}/>
                                        </div>
                                    </div>
                                    <div className={'row p-2 align-items-center'}>
                                        <div className={'col-5 pr-2'}>Date of Purchase</div>
                                        <div className={'col-7 pl-2'}>
                                            <input type="date" placeholder={'Date of Purchase'}
                                                   className={'form-control w-100'}/>
                                        </div>
                                    </div>
                                    <div className={'row p-2 align-items-center'}>
                                        <div className={'col-5 pr-2'}>Date of Registration</div>
                                        <div className={'col-7 pl-2'}>
                                            <input type="date" placeholder={'Date of Registration'}
                                                   className={'form-control w-100'}/>
                                        </div>
                                    </div>
                                    <div className={'row p-2 align-items-center'}>
                                        <div className={'col-5 pr-2'}>Is Capitalized Asset</div>
                                        <div className={'col-7 pl-2 row text-center'}>
                                            <div className="form-check col-md-6 px-2 text-center">
                                                <input className="form-check-input" type="radio" name="exampleRadios"
                                                       id="exampleRadios2" value="option2"/>
                                                <label className="form-check-label" htmlFor="exampleRadios2">
                                                    Yes
                                                </label>
                                            </div>
                                            <div className="form-check col-md-6 px-2 text-center">
                                                <input className="form-check-input" type="radio" name="exampleRadios"
                                                       id="exampleRadios2" value="option2"/>
                                                <label className="form-check-label" htmlFor="exampleRadios2">
                                                    No
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={'row p-2 align-items-center'}>
                                        <div className={'col-5 pr-2'}>Cost of Purchase</div>
                                        <div className={'col-7 pl-2'}>
                                            <input type="text" placeholder={'Cost of Purchase'}
                                                   className={'form-control w-100'}/>
                                        </div>
                                    </div>
                                    <div className={'row p-2 align-items-center'}>
                                        <div className={'col-5 pr-2'}>Installation Cost</div>
                                        <div className={'col-7 pl-2'}>
                                            <input type="text" placeholder={'Installation Cost'}
                                                   className={'form-control w-100'}/>
                                        </div>
                                    </div>
                                    <div className={'row p-2 align-items-center'}>
                                        <div className={'col-5 pr-2'}>Carrying Cost</div>
                                        <div className={'col-7 pl-2'}>
                                            <input type="text" placeholder={'Carrying Cost'}
                                                   className={'form-control w-100'}/>
                                        </div>
                                    </div>
                                    <div className={'row p-2 align-items-center'}>
                                        <div className={'col-5 pr-2'}>Other Cost</div>
                                        <div className={'col-7 pl-2'}>
                                            <input type="text" placeholder={'Other Cost'} className={'form-control w-100'}/>
                                        </div>
                                    </div>
                                    <div className={'row p-2 align-items-center'}>
                                        <div className={'col-5 pr-2'}>Is AMC</div>
                                        <div className={'col-7 pl-2 row text-center'}>
                                            <div className="form-check col-md-6 px-2 text-center">
                                                <input className="form-check-input" type="radio" name="exampleRadios"
                                                       id="exampleRadios2" value="option2"/>
                                                <label className="form-check-label" htmlFor="exampleRadios2">
                                                    Yes
                                                </label>
                                            </div>
                                            <div className="form-check col-md-6 px-2 text-center">
                                                <input className="form-check-input" type="radio" name="exampleRadios"
                                                       id="exampleRadios2" value="option2"/>
                                                <label className="form-check-label" htmlFor="exampleRadios2">
                                                    No
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={'row p-2 align-items-center'}>
                                        <div className={'col-5 pr-2'}>Asset Type</div>
                                        <div className={'col-7 pl-2'}>
                                            <select className={'form-control w-100'}>
                                                <option>Deprecated Asset</option>
                                                <option>Appareciated Asset</option>
                                                <option>Impairment Fixed Asset</option>
                                                <option>Floating Fixed Asset</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className={'row p-2 align-items-center'}>
                                        <div className={'col-5 pr-2'}>Depreciation Method</div>
                                        <div className={'col-7 pl-2'}>
                                            <select className={'form-control w-100'}>
                                                <option>Straight-line</option>
                                                <option>Accelerated</option>
                                                <option>Sum-of-Year</option>
                                                <option>Double-Declining-Balance</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className={'row p-2 align-items-center'}>
                                        <div className={'col-5 pr-2'}>Rate</div>
                                        <div className={'col-7 pl-2'}>
                                            <input type="text" placeholder={'Rate'} className={'form-control w-100'}/>
                                        </div>
                                    </div>
                                    <div className={'row p-2 align-items-center'}>
                                        <div className={'col-5 pr-2'}>Effective Date</div>
                                        <div className={'col-7 pl-2'}>
                                            <input type="date" placeholder={'Date of Purchase'}
                                                   className={'form-control w-100'}/>
                                        </div>
                                    </div>
                                    <div className={'row p-2 align-items-center'}>
                                        <div className={'col-5 pr-2'}>Current Book Value</div>
                                        <div className={'col-7 pl-2'}>
                                            <input type="text" placeholder={'Current Book Value'}
                                                   className={'form-control w-100'}/>
                                        </div>
                                    </div>
                                    <div className={'row p-2 align-items-center'}>
                                        <div className={'col-5 pr-2'}>Salvage Value</div>
                                        <div className={'col-7 pl-2'}>
                                            <input type="text" placeholder={'Salvage Value'}
                                                   className={'form-control w-100'}/>
                                        </div>
                                    </div>
                                    <div className={'row p-2 align-items-center'}>
                                        <div className={'col-5 pr-2'}>Useful Life</div>
                                        <div className={'col-7 pl-2'}>
                                            <input type="text" placeholder={'Useful Life'}
                                                   className={'form-control w-100'}/>
                                        </div>
                                    </div>
                                    <div className={'row p-2 align-items-center'}>
                                        <div className={'col-5 pr-2'}>Upload Image</div>
                                        <div className={'col-7 pl-2'}>
                                            <div className="custom-file">
                                                <input type="file" className="custom-file-input" id="customFileLang"
                                                       lang="es"/>
                                                <label className="custom-file-label" htmlFor="customFileLang">Choose
                                                    File</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={'row p-2 align-items-center'}>
                                        <div className={'col-5 pr-2'}>Is Maintenance Available</div>
                                        <div className={'col-7 pl-2 row text-center'}>
                                            <div className="form-check col-md-6 px-2 text-center">
                                                <input className="form-check-input" type="radio" name="exampleRadios"
                                                       id="exampleRadios2" value="option2"/>
                                                <label className="form-check-label" htmlFor="exampleRadios2">
                                                    Yes
                                                </label>
                                            </div>
                                            <div className="form-check col-md-6 px-2 text-center">
                                                <input className="form-check-input" type="radio" name="exampleRadios"
                                                       id="exampleRadios2" value="option2"/>
                                                <label className="form-check-label" htmlFor="exampleRadios2">
                                                    No
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={'row p-2 align-items-center'}>
                                        <div className={'col-5 pr-2 font-weight-bold'}>Number of Assets</div>
                                        <div className={'col-7 pl-2'}>
                                            <input type="text" placeholder={'Number of Assets'}
                                                   className={'form-control w-100'}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 pr-2">
                                    <div className={'row p-2 align-items-center'}>
                                        <div className={'col-5 pr-2'}>Is Maintenance Available</div>
                                        <div className={'col-7 pl-2 row text-center'}>
                                            <div className="form-check col-md-6 px-2 text-center">
                                                <input className="form-check-input" type="radio" name="exampleRadios"
                                                       id="exampleRadios2" value="option2"/>
                                                <label className="form-check-label" htmlFor="exampleRadios2">
                                                    Yes
                                                </label>
                                            </div>
                                            <div className="form-check col-md-6 px-2 text-center">
                                                <input className="form-check-input" type="radio" name="exampleRadios"
                                                       id="exampleRadios2" value="option2"/>
                                                <label className="form-check-label" htmlFor="exampleRadios2">
                                                    No
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={'row p-2 align-items-center'}>
                                        <div className={'col-5 pr-2'}>Project</div>
                                        <div className={'col-7 pl-2'}>
                                            <select className={'form-control w-100'}>
                                                <option>Asset Management Implementation/500K</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className={'row p-2 align-items-center'}>
                                        <div className={'col-5 pr-2'}>Product Serial No.</div>
                                        <div className={'col-7 pl-2'}>
                                            <input type="text" placeholder={'Product Serial No.'}
                                                   className={'form-control w-100'}/>
                                        </div>
                                    </div>
                                    <div className={'row p-2 align-items-center'}>
                                        <div className={'col-5 pr-2 font-weight-bold'}>Purchase Information</div>
                                        <div className={'col-7 pl-2'}></div>
                                    </div>
                                    <div className={'row p-2 align-items-center'}>
                                        <div className={'col-5 pr-2'}>Supplier/Vendor</div>
                                        <div className={'col-7 pl-2'}>
                                            <select className={'form-control w-100'}>
                                                <option>ABC Supplier</option>
                                                <option>Flora Telecom Limited</option>
                                                <option>Apsis Solutions Limited</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className={'row p-2 align-items-center'}>
                                        <div className={'col-5 pr-2'}>Product Order No.</div>
                                        <div className={'col-7 pl-2'}>
                                            <input type="text" placeholder={'Product Order No.'}
                                                   className={'form-control w-100'}/>
                                        </div>
                                    </div>
                                    <div className={'row p-2 align-items-center'}>
                                        <div className={'col-5 pr-2'}>Purchase Order Date</div>
                                        <div className={'col-7 pl-2'}>
                                            <input type="date" placeholder={'Purchase Order Date'}
                                                   className={'form-control w-100'}/>
                                        </div>
                                    </div>
                                    <div className={'row p-2 align-items-center'}>
                                        <div className={'col-5 pr-2'}>Warranty/Guarantee</div>
                                        <div className={'col-7 pl-2'}>
                                            <input type="text" placeholder={'Warranty/Guarantee'}
                                                   className={'form-control w-100'}/>
                                        </div>
                                    </div>
                                    <div className={'row p-2 align-items-center'}>
                                        <div className={'col-5 pr-2'}>Value of Insurance</div>
                                        <div className={'col-7 pl-2'}>
                                            <input type="text" placeholder={'Value of Insurance'}
                                                   className={'form-control w-100'}/>
                                        </div>
                                    </div>
                                    <div className={'row p-2 align-items-center'}>
                                        <div className={'col-5 pr-2'}>Value of Premium</div>
                                        <div className={'col-7 pl-2'}>
                                            <input type="text" placeholder={'Value of Premium'}
                                                   className={'form-control w-100'}/>
                                        </div>
                                    </div>
                                    <div className={'row p-2 align-items-center'}>
                                        <div className={'col-5 pr-2'}>Name of Insurance Company</div>
                                        <div className={'col-7 pl-2'}>
                                            <select className={'form-control w-100'}>
                                                <option>Progoti Insurance Company Ltd</option>
                                                <option>Padma Insurance Company Ltd</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className={'row p-2 align-items-center'}>
                                        <div className={'col-5 pr-2'}>Expire Date of Insurance</div>
                                        <div className={'col-7 pl-2'}>
                                            <input type="date" placeholder={'Expire Date of Insurance'}
                                                   className={'form-control w-100'}/>
                                        </div>
                                    </div>
                                    <div className={'row p-2 align-items-center'}>
                                        <div className={'col-5 pr-2'}>Condition</div>
                                        <div className={'col-7 pl-2'}>
                                            <select className={'form-control w-100'}>
                                                <option>New</option>
                                                <option>Good</option>
                                                <option>Fair</option>
                                                <option>Poor</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className={'row p-2 align-items-center'}>
                                        <div className={'col-5 pr-2'}>Comments</div>
                                        <div className={'col-7 pl-2'}>
                                            <textarea placeholder={'Comments'} className={'form-control w-100'}/>
                                        </div>
                                    </div>
                                    <div className={'row p-2 align-items-center'}>
                                        <div className={'col-5 pr-2'}>GL Expense</div>
                                        <div className={'col-7 pl-2'}>
                                            <select className={'form-control w-100'}>
                                                <option value="1">CASH BALANCES</option>
                                                <option value="2">BALANCES WITH B BANK AND ITS AGENT BANKS</option>
                                                <option value="3">BALANCES WITH OTHER BANKS AND FIS</option>
                                                <option value="4">MONEY AT CALL AND SHORT NOTICE</option>
                                                <option value="5">INVESTMENTS</option>
                                                <option value="6">LOANS &amp; ADVANCES</option>
                                                <option value="7">PROPERTY PLANT &amp; EQUIPMENT</option>
                                                <option value="8">INTANGIBLE ASSET</option>
                                                <option value="9">INTEREST RECEIVABLES - LOANS &amp; ADVANCES</option>
                                                <option value="10">INTEREST RECEIVABLES-BILLS PURCHASED &amp; DISCOUNTED
                                                </option>
                                                <option value="11">OTHER ASSETS</option>
                                                <option value="12">NON BANKING ASSET</option>
                                                <option value="13">BORROWINGS FROM BANGLADESH BANK</option>
                                                <option value="14">BORROWING FROM OTHER BANK AND NBFIS</option>
                                                <option value="15">MONEY MARKET BORROWINGS</option>
                                                <option value="16">BILLS PAYABLES</option>
                                                <option value="17">OTHER DEPOSITS</option>
                                                <option value="18">PROVISION FOR LOANS AND ADVANCES</option>
                                                <option value="19">PROVISION FOR OTHERS</option>
                                                <option value="20">INTEREST PAYABLE ON DEPOSITS</option>
                                                <option value="21">INTEREST SUSPENSE</option>
                                                <option value="22">OTHER LIABILITIES</option>
                                                <option value="23">PAID UP CAPITAL</option>
                                                <option value="24">SHARE PREMIUM</option>
                                                <option value="25">PREFERRENCE SHARE</option>
                                                <option value="26">STATUTORY RESERVE</option>
                                                <option value="27">OTHER RESERVE</option>
                                                <option value="28">RETAINED EARNINGS</option>
                                                <option value="29">INTEREST INCOME ON LOANS AND ADVANCES</option>
                                                <option value="30">INT INC ON BALANCES WITH OTHER BANKS AND FIS</option>
                                                <option value="31">FTP INCOME</option>
                                                <option value="32">INTEREST EXPENSES ON DEPOSITS</option>
                                                <option value="33">INTEREST EXPENSE ON BORROWINGS</option>
                                                <option value="34">FTP EXPENSE</option>
                                                <option value="35">INCOME ON INVESTMENTS</option>
                                                <option value="36">LOSS AGAINST INVESTMENT INCOME</option>
                                                <option value="37">COMMISSION INCOME</option>
                                                <option value="38">EXPENSE AGAINST COMMISSION INCOME</option>
                                                <option value="39">NET EXCHANGE GAIN</option>
                                                <option value="40">FEES INCOME FROM LOANS</option>
                                                <option value="41">EXPENSE AGAINST FEES INCOME FROM LOANS</option>
                                                <option value="42">FEES INCOME FROM DEPOSITS</option>
                                                <option value="43">EXPENSE AGAINST FEES INCOME FROM DEPOSITS</option>
                                                <option value="44">FEES INCOME FROM OTHERS</option>
                                                <option value="45">EXPENSE AGAINST FEES INCOME FROM OTHERS</option>
                                                <option value="46">OTHER OPERATING INCOME</option>
                                                <option value="47">STAFF SALARIES AND ALLOWANCES</option>
                                                <option value="48">OTHER OPERATING EXPENSES</option>
                                                <option value="49">DEPRECIATION &amp; AMORTIZATION</option>
                                                <option value="50">PROVISION EXPENSE FOR LOANS AND ADVANCES</option>
                                                <option value="51">OTHER PROVISION</option>
                                                <option value="52">INCOME TAX PROVISION</option>
                                                <option value="53">CONTINGENT ASSETS</option>
                                                <option value="54">CONTINGENT LIABILITIES</option>
                                                <option value="55">SYSTEM ACCOUNTS</option>
                                                <option value="56"></option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className={'row p-2 align-items-center'}>
                                        <div className={'col-5 pr-2'}>Include in Audits</div>
                                        <div className={'col-7 pl-2 row text-center'}>
                                            <div className="form-check col-md-6 px-2 text-center">
                                                <input className="form-check-input" type="radio" name="exampleRadios"
                                                       id="exampleRadios2" value="option2"/>
                                                <label className="form-check-label" htmlFor="exampleRadios2">
                                                    Yes
                                                </label>
                                            </div>
                                            <div className="form-check col-md-6 px-2 text-center">
                                                <input className="form-check-input" type="radio" name="exampleRadios"
                                                       id="exampleRadios2" value="option2"/>
                                                <label className="form-check-label" htmlFor="exampleRadios2">
                                                    No
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={'row p-2 align-items-center'}>
                                        <div className={'col-5 pr-2'}>Attachment</div>
                                        <div className={'col-7 pl-2'}>
                                            <div className="custom-file">
                                                <input type="file" className="custom-file-input" id="customFileLang"
                                                       lang="es"/>
                                                <label className="custom-file-label" htmlFor="customFileLang">Choose
                                                    File</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={'row p-2 align-items-center'}>
                                        <div className={'col-5 pr-2'}>Generate Barcode</div>
                                        <div className={'col-7 pl-2 text-center'}>
                                            <input className="form-check-input" type="checkbox" name={'genQr'} onChange={this.handleChange} value={genQr} id="defaultCheck1" />
                                            {genQr && <QRCode value={JSON.stringify(x)} />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AssetRegComponent;