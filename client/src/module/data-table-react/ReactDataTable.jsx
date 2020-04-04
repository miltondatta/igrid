import Axios from 'axios'
import './reactDataTable.css'
import React, {Component} from 'react';
import {apiBaseUrl, apiUrl} from "../../utility/constant";

class ReactDataTable extends Component {

    constructor(props)  {
        super(props)
        this.subData = 0
        this.state = {
            dataCount: 0,
            displayRow: 10,
            sortColumn: '',
            dataPassed: 0,
            filterByTitle: '',
            actualData: props.tableData ? props.tableData : [],
            tableData: props.tableData.length > 0 ? props.tableData.slice(0 , 10) : []
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.tableData.length !== state.tableData.length){
            return {
                actualData: props.tableData ? props.tableData : [],
                tableData: props.tableData ? props.tableData.slice(state.dataCount, state.dataCount + state.displayRow) : []
            };
        }
    }

    sortColumn = (e, sortColumn) => {
        e.preventDefault()
        const {tableData} = this.state
        if (sortColumn === this.state.sortColumn) {
            let sortData = tableData.sort((a, b) => (a[sortColumn] < b[sortColumn]) ? -1 : 1)
            this.setState({
                sortColumn: '',
                tableData: sortData
            })
        } else{
            this.setState({
                sortColumn: sortColumn,
                tableData: tableData.sort((a, b) => (a[sortColumn] > b[sortColumn]) ? -1 : 1)
            })
        }
    }

    handleChange = (e) => {
        const {actualData} = this.state
        const {name, value} = e.target
            if (name === 'displayRow') {
            this.setState({
                [name]: parseInt(value, 10),
                tableData: actualData.slice(0, value),
                dataCount: 0
            })
        } else {
            this.setState({
                [name]: value
            })
        }
    }

    handleInc = () => {
        const {dataCount, actualData, tableData, displayRow} = this.state
        console.log(dataCount)
        if (dataCount < actualData.length - (displayRow)) {
            this.setState((prevState) => ({
                dataCount: prevState.dataCount + tableData.length,
                increment: prevState.dataCount + tableData.length
            }), () => {
                this.setState({
                    tableData: actualData.slice(this.state.dataCount, this.state.dataCount + displayRow)
                })
            })
        }
    }

    handleDec = () => {
        const {dataCount, actualData, tableData, displayRow, increment} = this.state
        if (dataCount > 0) {
            this.setState((prevState) => ({
                dataCount: prevState.dataCount - increment
            }), () => {
                this.setState({
                    tableData: actualData.slice(this.state.dataCount, this.state.dataCount + displayRow)
                })
            })
        }
    }

    exportExcel = () => {
        let downloadLink;
        let dataType = 'application/vnd.ms-excel';
        let tableSelect = document.getElementById('__table_react');
        let tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
        let filename = 'excel_data.xls'
        downloadLink = document.createElement("a");
        document.body.appendChild(downloadLink);
        if(navigator.msSaveOrOpenBlob){
            let blob = new Blob(['\ufeff', tableHTML], {
                type: dataType
            });
            navigator.msSaveOrOpenBlob( blob, filename);
        } else{
            downloadLink.href = 'data:' + dataType + ', ' + tableHTML
            downloadLink.download = filename
            downloadLink.click()
        }
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

    render() {
        const {searchable, shortWidth, exportable, pagination, edit, del, details, approve, modal, bigTable, add, track, deleteModalTitle, dataDisplay, footer, remove,
            feedback, file, docDelete, docDetails, action} = this.props
        const {tableData, delId, actualData, dataCount, displayRow, filterByTitle} = this.state
        let title = tableData.length > 0 && Object.keys(tableData[0])[1]
        let filteredData = tableData.length > 0 &&  tableData.filter(item => (item[title].toLowerCase().includes(filterByTitle.toLowerCase())))

        let table_headers = filteredData.length > 0 && Object.keys(filteredData[0]).map((item, index) => (
            <>
                {(item === 'id' || item === 'requisition_id') ? null : item === 'file_name' ? null : <p style={{display: item.replace('_', " ") === '' && 'none'}} onClick={(e) => this.sortColumn(e, item)} scope="col" key={index}>
                    {
                        item.replace('_', " ")
                    }
                </p>}
            </>
        ))
        let table_body = filteredData.length > 0 && filteredData.map((item, index) => {
            return (
                <div key={index + 10} className={'ui-tbody-child'}>
                    <div className={'d-flex align-items-center'}>
                        <p className={'w-60px'}>{index + 1}</p>
                        {Object.keys(filteredData[0]).map((items, key) => (
                            <>
                            {(items !== 'id' && items !== 'file_name' && items !== 'requisition_id') &&
                                <p key={key + 20}>
                                    {(items === 'enlisted' || items === 'status') ? item[items] === null ? "Pending" : item[items] ? 'True' : 'False' : (item[items] === null || item[items] === " " || item[items] === "") ? 'N/A' : items === 'requisition_id' ? null : items === 'description' ? <div dangerouslySetInnerHTML={{__html: item[items]}} /> : item[items]}
                                </p>
                            }
                            </>
                        ))}
                       {(edit || feedback || del || add || details || approve || track || remove || file || docDelete || docDetails || action) &&
                           <p className={'ui-all-action'}>
                            {edit && <span data-toggle={`${modal && 'modal'}`} data-target={`${modal && modal}`} className="cursor-pointer text-warning" onClick={() => {this.props.updateEdit(item.id, edit)}}>
                                <i className="icofont-ui-edit"></i>
                            </span>}
                            {feedback && <span data-toggle={`${modal && 'modal'}`} data-target={`${modal && modal}`} className="cursor-pointer text-warning" onClick={() => {this.props.updateEdit(item.id, edit)}}>
                                <i className="icofont-ui-edit"></i>
                            </span>}
                            {del && <span onClick={() => {this.setState({delId: item.id})}} className="cursor-pointer text-danger" data-toggle="modal"
                                       data-target="#rowDeleteModal">
                                <i className="icofont-ui-delete"></i>
                            </span>}
                            {add && <span className="cursor-pointer text-project" onClick={() => {this.props.addAssets(item.id)}}>
                                <i className="icofont-ui-add"></i></span>}
                            {details && <span className="cursor-pointer text-primary" onClick={() => {this.props.assetList(details === 'reqHistory' ? item.requisition_id : item.id)}}><i className="fas fa-info-circle"></i></span>}
                            {approve && <span className="cursor-pointer text-danger">Approve</span>}
                            {track && <span className="cursor-pointer text-danger" onClick={() => {this.props.trackUser(item.user_ip)}}>
                                <i className="icofont-location-pin"></i>
                            </span>}
                            {remove && <span className="cursor-pointer text-danger" onClick={ () => {this.props.remove(item.id)}}>
                                <i className="fas fa-times"></i>
                            </span>}
                            {file && <span className="cursor-pointer w-125px text-success" onClick={ e => {this.props.file(e, item.file_name)}}>
                                <i className="fas fa-download"></i></span>
                            }
                            {docDelete && <span className="cursor-pointer text-danger" data-toggle={'modal'} data-target={'#docDeleteModal'} onClick={ () => {this.props.docDeleteModal(item.id)}}>
                                <i className="icofont-ui-delete"></i>
                            </span>}
                            {docDetails && <span className="cursor-pointer text-primary" onClick={() => {this.props.docDetails(item.id)}}><i className="fas fa-info-circle"></i></span>}
                            {action &&
                            <>
                                <span className={'d-flex justify-content-center'}>
                                    <i className="cursor-pointer text-warning icofont-ui-edit mr-2" onClick={() => {this.props.updateEdit(item.id, edit)}}></i>
                                    <i className="cursor-pointer text-danger icofont-ui-delete" data-toggle={'modal'} data-target={'#docDeleteModal'} onClick={ () => {this.props.docDeleteModal(item.id)}}></i>
                                </span>
                            </>
                            }
                        </p>}
                    </div>
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
            )})

        return (
            <div className={'reactDataTable'}>
                <div className="row">
                    {tableData.length > 0 && <><div className="col-md-6 justify-content-between row">
                        {dataDisplay && <div className="col-md-3">
                            <select name={'displayRow'} value={displayRow} className="form-control px-1 mb-3" style={{widp: '100%'}} onChange={this.handleChange}>
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>
                        </div>}
                        {exportable && <div className="col-md-9">
                            <button onClick={this.exportExcel} className="btn btn-outline-secondary">Export Excel</button>
                        </div>}
                    </div></>}
                    {searchable && <div className="col-md-6 d-flex flex-column align-items-end p-0 ml-3 mb-3">
                        <div className="input-group custom-search" style={{width: 280}}>
                            <input name={'filterByTitle'} onChange={this.handleChange} className="form-control h-45px" placeholder={`Search by ${title.split('_').join(' ')}`} />
                            <div className="input-group-append">
                                <div className="input-group-text"><i className="icofont-search-1"></i></div>
                            </div>
                        </div>
                    </div>}
                </div>
                {tableData.length > 0 ? <div id={'__table_react'} className={'table'}>
                    <div className={'thead'}>
                        <div className={'d-flex align-items-center'}>
                            <p className={'w-60px'}>
                                No
                            </p>
                            {table_headers}
                            {/*{bigTable && <>*/}
                                {(edit || del || add || details || approve || track || feedback || remove || file || docDelete || docDetails || action) &&
                                    <p className={'w-95px text-center'}>Action</p>
                                }
                            {/*</>}*/}
                        </div>
                        {/*{!bigTable && <div className={'d-flex text-right align-items-center justify-content-center ui-table-functions'}>*/}
                        {/*    {(edit || del || add || details || approve || track || feedback || remove || file || docDelete || docDetails || action) &&*/}
                        {/*        <p className={'w-95px text-center'}>Action</p>*/}
                        {/*    }*/}
                        {/*</div>}*/}
                    </div>
                    <div className={'tbody'}>
                        {table_body}
                    </div>
                </div> : <h4 className={'no-project px-2'}><i className="icofont-exclamation-circle"></i> No Data Found</h4>}
                <div className={'row'}>
                    {tableData.length > 0 && footer &&  <div className="col-md-5 mt-1">
                        <p>Showing {dataCount + 1} to {dataCount + tableData.length} of {actualData.length} entries</p>
                    </div>}
                    <div className={' col-md-7 align-items-center'}>
                        {tableData.length > 0 && pagination && <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-end">
                                <li className="page-item">
                                    <a className="page-link" href="#" aria-label="Previous" onClick={this.handleDec}>
                                        <span aria-hidden="true">&laquo;</span>
                                        <span className="sr-only">Previous</span>
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#" aria-label="Next" onClick={this.handleInc}>
                                        <span aria-hidden="true">&raquo;</span>
                                        <span className="sr-only">Next</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>}
                    </div>
                </div>
            </div>
        );
    }
}

export default ReactDataTable;