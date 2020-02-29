import React, {Component} from 'react';
import ReactDataTable from "../../module/data-table-react/ReactDataTable";
import HierarchiesOptions from "../../utility/component/hierarchyOptions";
import jwt from "jsonwebtoken";
import AssetListOptions from "../../utility/component/assetsByUserOptions";

class LostAssetsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            receivedBy: '',
            receivedByFocus: '',
            isLoading: '',
            errorDictAsset: '',
            received_by: '',
            recDropFoc: '',
            vendor_name: '',
            file_name: '',
            errorDict: '',
            enlisted: '',
            asset_id: '',
            incident_date: '',
            incident_time: '',
            police_station: '',
            gd_no: '',
            gd_date: '',
            dataTableData: ''
        }
    }
    render() {
        const {receivedBy, receivedByFocus,isLoading, errorDictAsset, received_by, recDropFoc, file_name, errorDict, asset_id, incident_date,
            incident_time,police_station,gd_no, gd_date, dataTableData} = this.state

        const {id} = jwt.decode(localStorage.getItem('user')) ? jwt.decode(localStorage.getItem('user')).data : ''
        const incedentTypes = receivedBy.length > 0 && receivedBy.map((item, index) => (
            <p key={index} onClick={() => {this.setState({received_by: item.received_by, receivedBy: []})}}>{item.received_by}</p>
        ))
        return (
            <div className="px-2 my-2 ui-dataEntry">
                <div className={`bg-white rounded p-3 min-h-80vh position-relative`}>
                    <nav className="navbar text-center mb-2 pl-2 rounded">
                        <p className="text-blue f-weight-700 f-20px m-0">Lost Asset Information</p>
                    </nav>
                    <div className="mb-1">
                        <label className={'ui-custom-label'}>Asset</label>
                        <select name={'asset_id'} value={asset_id} onChange={this.handleChange} className={`ui-custom-input ${(errorDict && !errorDict.asset_id) && 'is-invalid'}`}>
                            <option>Select Asset</option>
                            <AssetListOptions userId={id} />
                        </select>
                    </div>
                    <div className={'mb-1 position-relative'}>
                        <label className={'ui-custom-label'}>Incident Type</label>
                        <input onFocus={() => {this.setState({receivedByFocus: true})}} onBlur={() => {this.setState({receivedByFocus: false})}} autoComplete={'off'} placeholder='Incident Type' value={received_by} onChange={this.handleChange} name={'incident_type'} type={'text'} className={`ui-custom-input ${errorDict && !errorDict.incident_type && 'is-invalid'}`} />
                        {(receivedBy.length > 0 && received_by.length >= 3 && (receivedByFocus || recDropFoc)) && <div onMouseOver={() => {this.setState({recDropFoc: true})}} onMouseOut={() => {this.setState({recDropFoc: false})}} className={'ui-received-by'}>
                            {incedentTypes}
                        </div>}
                    </div>
                    <div className={'mb-1'}>
                        <label className={'ui-custom-label'}>Incident Date</label>
                        <input type="date"
                               name={'incident_date'}
                               value={incident_date}
                               onChange={this.handleChange}
                               className={`ui-custom-input w-100 ${errorDictAsset && !errorDictAsset.incident_date && 'is-invalid'}`}/>
                    </div>
                    <div className={'mb-1'}>
                        <label className={'ui-custom-label'}>Incident Time</label>
                        <input type="time"
                               value={incident_time}
                               onChange={this.handleChange}
                               name={'incident_time'}
                               className={`ui-custom-input w-100 ${errorDictAsset && !errorDictAsset.incident_time && 'is-invalid'}`}/>
                    </div>
                    <div className="mb-1">
                        <label className={'ui-custom-label'}>Police Station</label>
                        <input
                            placeholder='Police Station'
                            type={'text'}
                            name={'police_station'}
                            value={police_station}
                            onChange={this.handleChange}
                            className={`ui-custom-input ${(errorDict && !errorDict.police_station) && 'is-invalid'}`} />
                    </div>
                    <div className="mb-1">
                        <label className={'ui-custom-label'}>GD No</label>
                        <input
                            placeholder='GD No'
                            type={'text'}
                            name={'gd_no'}
                            value={gd_no}
                            onChange={this.handleChange}
                            className={`ui-custom-input ${(errorDict && !errorDict.gd_no) && 'is-invalid'}`} />
                    </div>
                    <div className={'mb-1'}>
                        <label className={'ui-custom-label'}>GD Date</label>
                        <input type="date"
                               name={'gd_date'}
                               value={gd_date}
                               onChange={this.handleChange}
                               className={`ui-custom-input w-100 ${errorDictAsset && !errorDictAsset.gd_date && 'is-invalid'}`}/>
                    </div>
                    <div className="mb-20p grid-2">
                        <div className="ui-custom-file">
                            <input type="file" onChange={this.handleChange} name={'file_name'} id="validatedCustomFile"
                                   required />
                            <label htmlFor="validatedCustomFile">{file_name.name ? file_name.name : file_name ? file_name : 'Choose file'}</label>
                        </div>
                    </div>
                    <button className="submit-btn" onClick={this.handleSubmit}>Submit</button>
                </div>
                <div className="rounded bg-white min-h-80vh p-2">
                    <nav className="navbar text-center mb-2 mt-1 pl-2 rounded">
                        <p className="text-blue f-weight-700 f-20px m-0">Lost Asset List</p>
                    </nav>
                    {isLoading ? <h2>Loading</h2> : dataTableData.length > 0 ? <>

                    </> : <h4 className={'no-project px-2'}><i className="icofont-exclamation-circle"></i> Currently There are No Data</h4>}
                </div>
            </div>
        );
    }
}

export default LostAssetsComponent;