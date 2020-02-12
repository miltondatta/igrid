import Axios from 'axios'
import './reactDataTable.css'
import React, {Component} from 'react';
import {apiUrl} from "../../utility/constant";

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

    deleteItem = (id) => {
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
        const {searchable, exportable, pagination, edit, del, details, approve, addName, add, track} = this.props
        const {tableData, sortColumn, actualData, dataCount, displayRow, filterByTitle} = this.state
        let title = tableData.length > 0 && Object.keys(tableData[0])[1]
        let filteredData = tableData.length > 0 &&  tableData.filter(item => (item[title].toLowerCase().includes(filterByTitle.toLowerCase())))

        let table_headers = filteredData.length > 0 && Object.keys(filteredData[0]).map((item, index) => (
            <>
                {item !== 'id' && <th onClick={(e) => this.sortColumn(e, item)} scope="col" key={index} className={'text-capitalize'}>
                    {sortColumn === item ? <i className="fas fa-angle-up text-dark"></i> : <i className="fas fa-angle-down text-dark"></i>} {item}
                </th>}
            </>
        ))
        let table_body = filteredData.length > 0 && filteredData.map((item, index) => (
            <tr key={index + 10}>
                <td>{index + 1}</td>
                {Object.keys(filteredData[0]).map((items, key) => (
                    <>
                    {items !== 'id' &&
                        <td key={key + 20}>
                            {items === 'enlisted' ? item[items] ? 'True' : 'False' : item[items]}
                        </td>
                    }
                    </>
                ))}
                {edit && <td className={'text-warning'}>
                    <p className="cursor-pointer text-warning" onClick={() => {this.props.updateEdit(item.id, edit)}}>Edit</p>
                </td>}
                {del && <td className={'text-danger'}>
                    <p className="cursor-pointer text-danger" onClick={() => {this.deleteItem(item.id)}}>Delete</p>
                </td>}
                {add && <td className={'text-danger'}>
                    <p className="cursor-pointer text-primary" onClick={() => {this.props.addAssets(item.id)}}>Add {addName}</p>
                </td>}
                {details && <td className={'text-danger'}>
                    <p className="cursor-pointer text-info" onClick={() => {this.props.assetList(details === 'reqHistory' ? item.requisition_id : item.id)}}>Details</p>
                </td>}
                {approve && <td className={'text-danger'}>
                    <p className="cursor-pointer text-danger">Approve</p>
                </td>}
                {track && <td className={'text-danger'}>
                    <p className="cursor-pointer text-danger" onClick={() => {this.props.trackUser(item.user_ip)}}>Track</p>
                </td>}
            </tr>
        ))

        return (
            <div className={'reactDataTable'}>
                <div className="row">
                    {tableData.length > 0 && <> <div className="col-md-6 justify-content-between row">
                        <div className="col-md-3">
                            <select name={'displayRow'} value={displayRow} className="form-control px-1 mb-3" style={{width: '100%'}} onChange={this.handleChange}>
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>
                        </div>
                        {exportable && <div className="col-md-9">
                            <button onClick={this.exportExcel} className="btn btn-outline-secondary">Export Excel</button>
                        </div>}
                    </div></>}
                   {searchable && <div className="col-md-6 d-flex flex-column align-items-end p-0 ml-3">
                        <div className="input-group" style={{width: 280}}>
                            <input name={'filterByTitle'} onChange={this.handleChange} className="form-control" placeholder={`Search by ${title.split('_').join(' ')}`} />
                            <div className="input-group-append">
                                <div className="input-group-text"><i className="fas fa-search"></i></div>
                            </div>
                        </div>
                    </div>}
                </div>
                {tableData.length > 0 ? <table id={'__table_react'} className={'table table table-bordered'}>
                    <thead>
                        <tr>
                            <th scope="col" className={'text-capitalize'}>
                                No
                            </th>
                            {table_headers}
                            {edit && <th>Edit</th>}
                            {del && <th>Delete</th>}
                            {add && <th>Add</th>}
                            {details && <th>Details</th>}
                            {approve && <th>Approve</th>}
                            {track && <th>Track</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {table_body}
                    </tbody>
                </table> : <h3>No Data Available</h3>}
                <div className={'row'}>
                    {tableData.length > 0 && <div className="col-md-5 mt-1">
                        <p>Showing {dataCount + 1} to {dataCount + tableData.length} of {actualData.length} entries</p>
                    </div>}
                    <div className={' col-md-7 align-items-center'}>
                        {pagination && <nav aria-label="Page navigation example">
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