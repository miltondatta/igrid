import React, {Component} from 'react';
import ReactDataTable from "../../module/data-table-react/ReactDataTable";
import jwt from "jsonwebtoken";
import AssetListOptions from "../../utility/component/assetsByUserOptions";
import Axios from "axios";
import {apiUrl} from "../../utility/constant";

class LostAssetsComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lostAssets: [],
            incidentTypeList: '',
            incidentTypeListFocus: '',
            isLoading: '',
            errorDictAsset: '',
            incident_type: '',
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
            dataTableData: '',
            error: false,
            errorMessage: '',
            successMessage: '',
            success: false
        }
    }

    componentDidMount() {
        this.getLostAssets()
    }

    handleChange = (e) => {
        const {name, value, files} = e.target
        if (name === 'gd_other_file') {
            this.setState({gd_other_file: files[0]})
        } else if(name === 'incident_type') {
            this.setState({
                incident_type: value
            }, () => {
                this.getIncidentType(value)
            })
        } else {
            this.setState({
                [name]: value
            })
        }
    }

    getIncidentType = (name) => {
        let data = {
            incident_type: name
        }
        if (name.length >= 3) {
            Axios.post(apiUrl() + 'lost-assets/incident_type', data)
                .then(res => {
                    if (!res.status) {
                        this.setState({
                            error: true,
                            errorMsg: res.message
                        })
                    } else {
                        this.setState({
                            incidentTypeList: res.data
                        })
                    }
                })
        }
    }

    submitLostAssets = () => {
        const {id, location_id, role_id} = jwt.decode(localStorage.getItem('user')) ? jwt.decode(localStorage.getItem('user')).data : ''
        const {incident_type, gd_other_file, asset_id, incident_date, incident_time,police_station,gd_no, gd_date} = this.state
        const data = new FormData()
        data.append('file', gd_other_file)
        data.append('asset_id', asset_id)
        data.append('added_by', id)
        data.append('role_id', role_id)
        data.append('location_id', location_id)
        data.append('incident_date', incident_date)
        data.append('incident_time', incident_time)
        data.append('police_station', police_station)
        data.append('gd_no', gd_no)
        data.append('gd_date', gd_date)
        data.append('incident_type', incident_type)

        Axios.post(apiUrl() + 'lost-assets/entry', data)
            .then(resData => {
                if (resData.data.status) {
                    console.log(resData, 186)
                    this.setState({
                        success: true,
                        successMessage: resData.data.message
                    }, () => {
                        window.location.reload()
                    })
                } else {
                    this.setState({
                        error: true,
                        errorMessage: resData.data.message
                    })
                }
            })
            .catch(err => {console.log(err)})
    }

    getLostAssets = () => {
        Axios.get(apiUrl() + 'lost-assets')
            .then(res => {
                if (res.data.status) {
                    this.setState({
                        lostAssets: res.data.res
                    })
                } else {
                    this.setState({
                        error: true,
                        errorMessage: res.data.message
                    })
                }
            })
    }

    render() {
        const {incidentTypeList, incidentTypeListFocus,isLoading, errorDictAsset, incident_type, recDropFoc, gd_other_file, errorDict, asset_id, incident_date,
            incident_time,police_station,gd_no, gd_date, error, errorMessage, successMessage, success, lostAssets} = this.state

        const {id} = jwt.decode(localStorage.getItem('user')) ? jwt.decode(localStorage.getItem('user')).data : ''
        console.log(jwt.decode(localStorage.getItem('user')).data, 90)
        const incedentTypes = incidentTypeList.length > 0 && incidentTypeList.map((item, index) => (
            <p key={index} onClick={() => {this.setState({incident_type: item.incident_type, incidentTypeList: []})}}>{item.incident_type}</p>
        ))
        return (
            <>
                {error &&
                <div
                    className="alert alert-danger mx-3 mt-2 mb-0 position-relative d-flex justify-content-between align-items-center"
                    role="alert">
                    {errorMessage} <i className="fas fa-times " onClick={() => {
                    this.setState({error: false})
                }}></i>
                </div>}
                {success &&
                <div
                    className="alert alert-success mx-3 mt-2 mb-0 position-relative d-flex justify-content-between align-items-center"
                    role="alert">
                    {successMessage} <i className="fas fa-times " onClick={() => {
                    this.setState({success: false})
                }}></i>
                </div>}
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
                            <input onFocus={() => {this.setState({incidentTypeListFocus: true})}} onBlur={() => {this.setState({incidentTypeListFocus: false})}} autoComplete={'off'} placeholder='Incident Type' value={incident_type} onChange={this.handleChange} name={'incident_type'} type={'text'} className={`ui-custom-input ${errorDict && !errorDict.incident_type && 'is-invalid'}`} />
                            {(incidentTypeList.length > 0 && incident_type.length >= 3 && (incidentTypeListFocus || recDropFoc)) && <div onMouseOver={() => {this.setState({recDropFoc: true})}} onMouseOut={() => {this.setState({recDropFoc: false})}} className={'ui-received-by'}>
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
                                <input type="file" onChange={this.handleChange} name={'gd_other_file'} id="validatedCustomFile"
                                       required />
                                <label htmlFor="validatedCustomFile">{gd_other_file && gd_other_file.name ? gd_other_file.name : gd_other_file ? gd_other_file : 'Choose file'}</label>
                            </div>
                        </div>
                        <button className="submit-btn" onClick={this.submitLostAssets}>Submit</button>
                    </div>
                    <div className="rounded bg-white min-h-80vh p-2">
                        <nav className="navbar text-center mb-0 mt-1 pl-2 rounded">
                            <p className="text-blue f-weight-700 f-20px m-0">Lost Asset List</p>
                        </nav>
                        {isLoading ? <h2>Loading</h2> : lostAssets.length > 0 ? <>
                            <ReactDataTable
                                tableData={lostAssets}
                            />
                        </> : <h4 className={'no-project px-2'}><i className="icofont-exclamation-circle"></i> Currently There are No Data</h4>}
                    </div>
                </div>
            </>
        );
    }
}

export default LostAssetsComponent;