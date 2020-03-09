import React, {Component} from 'react';
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class ReactExcelExport extends Component {
    render() {
        const {excelData} = this.props
        const filterData = Object.keys(excelData[0]).filter(item => item !== 'id')
        const exclCol = filterData.length > 0 && filterData.map((item, index) => {
            console.log(item)
            return(
                    <ExcelColumn label={item.replace('_', ' ').toUpperCase()} value={(col) => col[item] !== null ? col[item] : '0'}/>
            )
        })

        return (
            <div>
                <ExcelFile element={<button className={'bg-transparent'}>Excel</button>}>
                    <ExcelSheet data={excelData} name="Employees">
                        {exclCol}
                    </ExcelSheet>
                </ExcelFile>
            </div>
        );
    }
}

export default ReactExcelExport;

