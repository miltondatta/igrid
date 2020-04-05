import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './pdatatable.css'
import React, {Component} from 'react'
import {Column} from 'primereact/column';
import {DataTable} from 'primereact/datatable';
import Axios from "axios";
import {apiUrl} from "../../utility/constant";

class PrimeDataTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cols: [],
            selectedCustomers: null
        };
    }

    componentDidMount() {
        let cols = [];
        const {data} = this.props
        data.length > 0 && Object.keys(data[0]).forEach(rowData => {
            (rowData !== 'id' && rowData !== 'requisition_id' && rowData !== 'file_name') && cols.push({field: rowData, header: rowData.replace('_', " ").replace('_', " ").replace('_', " ")})
        })

        // cols.push({field: 'action', header: 'Action'}

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

    actionTemplate = (rowData, column) => {
        const {delId} = this.state
        const {edit, del, details, approve, modal,add, track, remove, feedback, file, docDelete, docDetails, action, deleteModalTitle} = this.props
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

    displayData = (rowData, column) => {
        console.log(rowData, column)
        return(
            <>{(rowData[column.field] === "" || rowData[column.field] === null) ? 'N/A' : rowData[column.field]}</>
        )
    }

    render() {
        const {cols} = this.state

        let dynamicColumns = cols.map((col,i) => {
            return <Column body={this.displayData} key={col.field} field={col.field} header={col.header} />;
        });

        return (
                <div className="content-section implementation mt-3">
                    <DataTable value={this.props.data} responsive={true} className="p-datatable-customers" dataKey="id"
                               selection={this.state.selectedCustomers} onSelectionChange={e => this.setState({selectedCustomers: e.value})}
                               paginator rows={10} emptyMessage="No customers found" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                               paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[10,25,50]}
                    >
                        {dynamicColumns}
                        <Column body={this.actionTemplate} field={'action'} header={'Action'} style={{textAlign:'center', width: '8em'}}/>
                    </DataTable>
                </div>
        );
    }
}

export default PrimeDataTable