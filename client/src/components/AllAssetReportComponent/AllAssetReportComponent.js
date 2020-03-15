import React, {Component} from 'react';
import ErrorModal from "../../utility/error/errorModal";
import ReactExcelExport from "../../module/react-excel-export/reactExcelExport";
import TablePdfViewer from "../../module/table-pdf-viewer/tablePdfViewer";

class AllAssetReportComponent extends Component {
    render() {
        return (
            <>
                {error &&
                <ErrorModal ops errorMessage={errorMessage} />
                }
                <div className="ui-mis-report">
                    <div className="ui-top-container">
                        <div className={'ui-selects-container'}>
                            {locations}
                            <div>
                                <label className={'ui-custom-label'}>Date From</label>
                                <input type="date"
                                       name={'date_from'}
                                       value={date_from}
                                       onChange={this.handleChange}
                                       className={`ui-custom-input w-100 ${errorDict && !errorDict.date_from && 'border-red'}`}/>
                            </div>
                            <div>
                                <label className={'ui-custom-label'}>Date To</label>
                                <input type="date"
                                       name={'date_to'}
                                       value={date_to}
                                       onChange={this.handleChange}
                                       className={`ui-custom-input w-100 ${errorDict && !errorDict.to && 'border-red'}`}/>
                            </div>
                        </div>
                        <div className="ui-btn-container rounded">
                            <button onClick={this.handleSubmit} className={'mx-2 report-submit-btn'}>Submit</button>
                            <button className={'mx-2 report-reset-btn'}>Reset</button>
                            <div className={'position-relative'}>
                                <button onClick={() => {this.setState((prevState) => ({optionDropDown: !prevState.optionDropDown}))}} className={'mx-2 report-export-btn'}>Export</button>
                                {optionDropDown && <div className={'ui-dropdown-btn'}>
                                    <button className={`${typeof dailyReport !== 'undefined' && (dailyReport[Object.keys(dailyReport)[0]] ? 'p-0' : null)}`}>{(typeof dailyReport !== 'undefined' && (dailyReport[Object.keys(dailyReport)[0]]) ? <ReactExcelExport misReport excelData={dailyReport} /> : 'Excel')}</button>
                                    <button onClick={this.pdfViewr}>PDF</button>
                                </div>}
                            </div>
                        </div>
                    </div>

                    {!haveData ? <h4 className={'no-project px-2 mt-4'}><i className="icofont-exclamation-circle"></i> Currently There are No Data</h4> : <div className="ui-report-container">
                        <div className="ui-report-header">
                            {reportHeader}
                        </div>
                        {reportBody}
                    </div>}
                </div>

                {pdf && <TablePdfViewer pdfViewr={this.pdfViewr} reportTitle={'Delivery Report'}  tableData={dailyReport} />}
            </>
        );
    }
}

export default AllAssetReportComponent;