import React, {Component} from 'react';
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class ReactExcelExport extends Component {
    render() {
        const {excelData, misReport} = this.props
        const filterData = misReport ? Object.keys(excelData[Object.keys(excelData)][0]).filter(item => item !== 'id') : Object.keys(excelData[0]).filter(item => item !== 'id')
        let exclCol = null

        if (misReport) {
            let processedData = []
            Object.keys(excelData).map(item => {
                processedData = [{indicatordetails_id: item}, ...excelData[item]]
            })
            console.log(processedData, 20)
            exclCol = filterData.length > 0 && filterData.map((item, index) => {
                console.log(item, 21)
                return (
                    <ExcelColumn label={item.replace('_', ' ').toUpperCase()}
                                 value={(col) => col[item] !== null ? col[item] : '0'}/>
                )
            })
            return (
                <div>
                    <ExcelFile element={<button className={'bg-transparent'}>Excel</button>}>
                        <ExcelSheet data={processedData} name="Employees">
                            {exclCol}
                        </ExcelSheet>
                    </ExcelFile>
                </div>
            )
        }
        else {
            exclCol = filterData.length > 0 && filterData.map((item, index) => {
                return (
                    <ExcelColumn label={item.replace('_', ' ').toUpperCase()}
                                 value={(col) => col[item] !== null ? col[item] : '0'}/>
                )
            })
            console.log(excelData, 36)
            return (
                <div>
                    <ExcelFile element={<button className={'bg-transparent'}>Excel</button>}>
                        <ExcelSheet data={excelData} name="Employees">
                            {exclCol}
                        </ExcelSheet>
                    </ExcelFile>
                </div>
            )
        }
    }
}

export default ReactExcelExport;

