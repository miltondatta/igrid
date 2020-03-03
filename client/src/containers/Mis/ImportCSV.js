import React from 'react'
import ImportCSVComponent from  "../../components/MisComponent/ImportCSVComponent";


const ImportCSVContainer = () => {
    return (
        <div>
            <ImportCSVComponent
                title='Uploaded CSV File History'
                headTitle='Upload CSV File For Indicator Data'
            />
        </div>
    )
};
export default ImportCSVContainer;