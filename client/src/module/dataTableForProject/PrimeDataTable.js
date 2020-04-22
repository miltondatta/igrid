import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './pdatatable.css'
import React, {Component} from 'react'
import {Column} from 'primereact/column';
import {DataTable} from 'primereact/datatable';
import Axios from "axios";
import {apiUrl} from "../../utility/constant";
import SuccessModal from "../../utility/success/successModal";
import ErrorModal from "../../utility/error/errorModal";

class PrimeDataTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cols: [],
            error: false,
            success: false,
            errorMessage: '',
            successMessage: '',
            selectedCustomers: null
        };
    }

    componentDidMount() {
        let cols = [];
        const {data} = this.props
        data.length > 0 && Object.keys(data[0]).forEach(rowData => {
            (rowData !== 'id' && rowData !== 'requisition_id' && rowData !== 'file_name') && cols.push({field: rowData, header: rowData.replace('_', " ").replace('_', " ").replace('_', " ")})
        })

        this.setState({
            cols
        })
    }

    deleteItem = (e, id) => {
        e.preventDefault()
        const {del} = this.props
        const data = {id}
        Axios.delete(apiUrl() + del + '/delete', {data})
            .then(resData => {
                window.location.reload()
            })
            .catch(res => {
                console.log(res)
            })
    }

    unavailable = (id) => {
        const {unavailable} = this.props
        Axios.post(apiUrl() + unavailable + '/unavailable/' + id + '/9')
            .then(res => {
                if(res.data.status){
                    this.setState({
                        success: true,
                        successMessage: res.data.message
                    }, () => {
                        setTimeout(() => {
                            this.setState({
                                success: false
                            })
                            window.location.reload()
                        }, 2300);
                    })
                }
            })
    }

    actionTemplate = (rowData, column) => {
        const {delId} = this.state
        const {edit, del, details, approve, modal,add, track, remove, feedback, file, docDelete, docDetails, action, deleteModalTitle, unavailable, delivery} = this.props
        return (
            <div>
                {(edit || feedback || del || add || details || approve || track || remove || file || docDelete || docDetails || action) &&
                <p className={'ui-all-action'}>
                    {edit && <span data-toggle={`${modal && 'modal'}`} data-target={`${modal && modal}`} className="cursor-pointer text-warning" onClick={() => {this.props.updateEdit(rowData.id, edit)}}>
                                <i className="icofont-ui-edit"></i>
                            </span>}
                    {feedback && <span data-toggle={`${modal && 'modal'}`} data-target={`${modal && modal}`} className="cursor-pointer text-warning" onClick={() => {this.props.updateEdit(rowData.id, edit)}}>
                                <i className="icofont-ui-edit"></i>
                            </span>}
                    {del && <span onClick={() => {this.setState({delId: rowData.id})}} className="cursor-pointer text-danger" data-toggle="modal"
                                  data-target="#rowDeleteModal">
                                <i className="icofont-ui-delete"></i>
                            </span>}
                    {add && <span className="cursor-pointer text-project" onClick={() => {this.props.addAssets(rowData.id)}}>
                                <i className="icofont-ui-add"></i></span>}
                    {details && <span className="cursor-pointer text-primary"
                                      onClick={() => {this.props.assetList(details === 'reqHistory' ? rowData.requisition_id : rowData.id)}}><i className="fas fa-info-circle"></i></span>}
                    {approve && <span className="cursor-pointer text-danger">Approve</span>}
                    {track && <span className="cursor-pointer text-danger" onClick={() => {this.props.trackUser(rowData.user_ip)}}>
                                <i className="icofont-location-pin"></i>
                            </span>}
                    {remove && <span className="cursor-pointer text-danger" onClick={ () => {this.props.remove(rowData.id)}}>
                                <i className="fas fa-times"></i>
                            </span>}
                    {file && <span className="cursor-pointer w-125px text-success" onClick={ e => {this.props.file(e, rowData.file_name)}}>
                                <i className="fas fa-download"></i></span>
                    }
                    {docDelete && <span className="cursor-pointer text-danger" data-toggle={'modal'} data-target={'#docDeleteModal'} onClick={ () => {this.props.docDeleteModal(rowData.id)}}>
                                <i className="icofont-ui-delete"></i>
                            </span>}
                    {docDetails && <span className="cursor-pointer text-primary" onClick={() => {this.props.docDetails(rowData.id)}}><i className="fas fa-info-circle"></i></span>}
                    {action &&
                    <>
                                <span className={'d-flex justify-content-center'}>
                                    <i className="cursor-pointer text-warning icofont-ui-edit mr-2" onClick={() => {this.props.updateEdit(rowData.id, edit)}}></i>
                                    <i className="cursor-pointer text-danger icofont-ui-delete" data-toggle={'modal'} data-target={'#docDeleteModal'} onClick={ () => {this.props.docDeleteModal(rowData.id)}}></i>
                                </span>
                    </>
                    }
                </p>}
                <div className="modal fade" id="rowDeleteModal" tabIndex="-1" role="dialog"
                     aria-labelledby="rowDeleteModal" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">{deleteModalTitle}</h5>
                                <button type="button" className="close" data-dismiss="modal"
                                        aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p className={'w-100'}>Are you sure you want to delete?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary"
                                        data-dismiss="modal">Cancel
                                </button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal"
                                        onClick={(e) => this.deleteItem(e, delId)}>Delete Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    actionComment = (rowData, column) => {
        console.log(rowData, column, 120)
        return(
            <p>
                <input
                    type={'text'}
                    name={'comment'}
                    placeholder={'Comments'}
                    className={'ui-req-textarea'}
                    onChange={(e) => this.props.handleComment(e, rowData.id)}
                />
            </p>
        )
    }

    actionQuantity = (rowData, column) => {
        return(
            <p>
                {this.props.state[rowData.id] ? <input
                        className={'ui-transparent-input'}
                        onChange={(e) => {this.props.handleQuantity(e,rowData.id, 'update_quantity', rowData.quantity )}}
                    /> :
                    <input
                        className={'ui-transparent-input'}
                        onFocus={() => {this.props.handleState(rowData.id)}}
                        value={rowData.quantity} />}
            </p>
        )
    }

    actionProduct = (rowData, column) => {
        const {products} = this.props
        const filteredCategory = products.length > 0 && products.filter(item => (item.asset_category === parseInt(rowData.asset_category, 10) && item.asset_sub_category === parseInt(rowData.asset_sub_category, 10)))
        console.log(filteredCategory, 151)
        const selectAsset = filteredCategory.length > 0 && filteredCategory.map((item, index) => {
            return(
                <div>
                    <input type={'checkbox'}
                           value={item.id}
                           id={item.products}
                           name={item.products}
                           onChange={(e) => this.props.handleMultiselect(e, rowData.delivery_to)}/>
                    <label htmlFor={item.products}>{item.products}</label>
                </div>
            )
        })

        return (
            <>
                <button
                    className={"btn btn-info btn-sm"}
                    data-toggle="modal"
                    data-target="#deliverProduct">Products</button>
                <div className="modal fade" id="deliverProduct" tabIndex="-1" role="dialog"
                     aria-labelledby="rowDeleteModal" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Deliver Products</h5>
                                <button type="button" className="close" data-dismiss="modal"
                                        aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className={'ui-multiselect'}>
                                    {selectAsset}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>)
    }

    actionDanger = (rowData, column) => {
        return (
            <div dangerouslySetInnerHTML={{__html: rowData['description']}} />
        )
    }

    actionUnavailable = (rowData, column) => {
        return (
            <div>
                <button data-toggle="modal" data-target="#requestCancel" className={'btn btn-danger py-1'}><i className="fas fa-folder-minus"></i></button>
                <div className="modal fade" id="requestCancel" tabIndex="-1" role="dialog"
                     aria-labelledby="requestCancel" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Asset Transfer Request</h5>
                                <button type="button" className="close" data-dismiss="modal"
                                        aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <h5 className={'w-100 f-18px'}>Are you sure you want to cancel this transfer request?</h5>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary"
                                        data-dismiss="modal">Close
                                </button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal"
                                        onClick={() => {this.unavailable(rowData.id)}}>Cancel Request
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    actionDelivery = (rowData, column) => {
        return (
            <div>
                <button onClick={() => {this.props.delivery(rowData.id)}} className={'btn btn-secondary py-1'}><i
                    className="fas fa-dolly-flatbed"></i></button>
            </div>
        )
    }

    displayData = (rowData, column) => {
        return(
            <>{(rowData[column.field] === "" || rowData[column.field] === null || rowData[column.field] === " ") ? 'N/A' :
                (rowData[column.field] === false || rowData[column.field] === true) ? ((rowData[column.field] === false || rowData[column.field] === true) ? 'False' :  'True') : rowData[column.field]}</>
        )
    }

    render() {
        const {cols, success, successMessage, error, errorMessage} = this.state
        const {edit, del, details, approve, dnger,add, track, remove, feedback, file, docDelete, docDetails, action, productDelivery, unavailable, delivery} = this.props
        let dynamicColumns = cols.map((col,i) => {
            if (productDelivery) {
                if (col.field === 'category_name' || col.field === 'sub_category_name' || col.field === 'role_name' || col.field === 'location_name' || col.field === 'update_quantity'){
                    return <Column sortable={true} filter={true} style={{width:'200px', height: '45px'}} filterPlaceholder={col.header} body={this.displayData} key={col.field} field={col.field} header={col.header} />;
                }
            } else if(dnger) {
                if (col.field === 'description') {
                    return <Column sortable={true} filter={true} style={{width:'200px', height: '45px'}} filterPlaceholder={col.header} body={this.actionDanger} key={col.field} field={col.field} header={col.header} />
                } else {
                    return <Column sortable={true} filter={true} style={{width:'200px', height: '45px'}} filterPlaceholder={col.header} body={this.displayData} key={col.field} field={col.field} header={col.header} />;
                }
            } else {
                return <Column sortable={true} filter={true} style={{width:'200px', height: '45px'}} filterPlaceholder={col.header} body={this.displayData} key={col.field} field={col.field} header={col.header} />;
            }
        });

        return (
            <>
                {success && <SuccessModal successMessage={successMessage}/>}
                {error && <ErrorModal errorMessage={errorMessage}/>}
                <div className="content-section implementation mt-3">
                    <DataTable value={this.props.data} responsive={true} className="p-datatable-customers" dataKey="id" scrollable={true}
                               selection={this.state.selectedCustomers} onSelectionChange={e => this.setState({selectedCustomers: e.value})}
                               paginator rows={10} emptyMessage="No customers found" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                               paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[10,25,50]}
                    >
                        {dynamicColumns}
                        {(edit || feedback || del || add || details || approve || track || remove || file || docDelete || docDetails || action) && <Column filter={false} body={this.actionTemplate} field={'action'} header={'Action'} style={{textAlign:'center', width:'200px', height: '45px'}}/>}
                        {this.props.handleQuantity && <Column style={{width:'200px', height: '45px'}} body={this.actionQuantity} field={'quantity'} header={'Quantity'} />}
                        {this.props.handleComment && <Column style={{width:'200px', height: '45px'}} body={this.actionComment} field={'comment'} header={'Comment'}/>}
                        {this.props.handleMultiselect && <Column style={{width:'200px', height: '45px'}} body={this.actionProduct} field={'products'} header={'Products'}/>}
                        {unavailable && <Column style={{width:'95px', height: '45px', textAlign: 'center'}} body={this.actionUnavailable} field={'unavailable'} header={'Unavailable'}/>}
                        {delivery && <Column style={{width:'80px', height: '45px', textAlign: 'center'}} body={this.actionDelivery} field={'delivery'} header={'Delivery'}/>}
                    </DataTable>
                </div>
            </>
        );
    }
}

export default PrimeDataTable