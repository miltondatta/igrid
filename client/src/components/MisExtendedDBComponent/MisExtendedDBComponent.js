import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './misextended.css'
import {MultiSelect} from 'primereact/multiselect';
import moment from "moment";
import React, {Component} from 'react';
import DatePicker from 'react-datepicker2';
import LocationsWithHOptions from "../../utility/component/locationWithHierarchy";
import Axios from "axios";
import {apiUrl} from "../../utility/constant";
import ErrorModal from "../../utility/error/errorModal";

class MisExtendedDbComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            parentID: 0,
            error: false,
            date_from: moment(),
            date_to: moment(),
            hierarchies: [],
            indicatorOptions: [],
            indicator: []
        }
    }

    componentDidMount() {
        this.getHierarchies()
    }

    handleChange = (e, nam, hierarchies) => {
        const {name, value} = e.target
        if (name === 'parentID') {
            this.setState({
                [name]: value,
                [nam]: value,
                indicatorOptions: []
            }, () => {
                this.validate()
                this.getIndicator()
            })
        } else {
            this.setState({
                [name]: value,
                [nam]: value
            }, () => {
                this.validate()
            })
        }
    }

    getIndicator = () => {
        const {parentID} = this.state
        Axios.get(apiUrl() + 'mis/extended-dashboard/indicator/' + parentID)
            .then(res => {
                if(res.data.status) {
                    const indicatorOptions = []
                    res.data.data.forEach(item => {
                        indicatorOptions.push({label: item.indicator_name, value: item.id})
                    })
                    this.setState({
                        indicatorOptions
                    })
                }
            })
    }

    getHierarchies = () => {
        Axios.get(apiUrl() + 'locHierarchies')
            .then(res => {
                this.setState({
                    hierarchies: res.data
                })
            })
    }

    validate = () => {
        const {date_from, date_to, parentID} = this.state
        let errorDict = {
            date_from: typeof date_from !== 'undefined' && date_from !== '',
            date_to: typeof date_to !== 'undefined' && date_to !== '',
            parentID: typeof parentID !== 'undefined' && parentID !== 0
        }
        this.setState({
            errorDict
        })
        return errorDict
    }

    render() {
        const {hierarchies, parentID, date_from, date_to, errorMessage, error, errorDict, indicatorOptions, indicator} = this.state

        console.log(indicator, 95)

        const locations = hierarchies.length > 0 && hierarchies.map(item => {
            return (
                <div className={'position-relative ui-section'}>
                    <label htmlFor="" className={'ui-custom-label'}>{item.hierarchy_name}</label>
                    <select
                        name={'parentID'}
                        onChange={(e) => this.handleChange(e, item.hierarchy_name, item.id)}
                        className={`ui-custom-input ${errorDict && !errorDict.parentID && 'border-red'}`}>
                        <option selected={true} disabled={true}>{item.hierarchy_name}</option>
                        <LocationsWithHOptions parentID={parentID}
                                               hierarchyID={item.id === parseInt(parentID, 10) + 1 ? item.id : null}/>
                    </select>
                </div>
            )
        })

        console.log(indicatorOptions)

        return (
            <>
                {error &&
                    <ErrorModal ops errorMessage={errorMessage}/>
                }
                <div className="ui-mis-report">
                    <div className="ui-top-container">
                        <div className={'ui-selects-container'}>
                            {locations}
                            <div className={'ui-section'}>
                                <label className={'ui-custom-label'}>Date From</label>
                                <DatePicker timePicker={false}
                                            name={'date_from'}
                                            className={`ui-custom-input w-100 ${errorDict && !errorDict.date_from && 'is-invalid'}`}
                                            inputFormat="DD/MM/YYYY"
                                            onChange={date => this.setState({date_from: date})}
                                            value={date_from}/>
                            </div>
                            <div className={'ui-section'}>
                                <label className={'ui-custom-label'}>Date To</label>
                                <DatePicker timePicker={false}
                                            name={'date_to'}
                                            className={`ui-custom-input w-100 ${errorDict && !errorDict.date_to && 'is-invalid'}`}
                                            inputFormat="DD/MM/YYYY"
                                            onChange={date => this.setState({date_to: date})}
                                            value={date_to}/>
                            </div>
                            {indicatorOptions.length > 0 && <div className={'ui-section'}>
                                <MultiSelect value={indicator} options={indicatorOptions} placeholder="Choose Indicator" onChange={(e) => this.setState({indicator: e.value})} />
                            </div>}
                        </div>
                        <div className="ui-btn-container rounded px-2">
                            <button onClick={this.handleSubmit} className={'mx-2 report-submit-btn'}>Submit</button>
                            <button className={'mx-2 report-reset-btn'} onClick={() => {
                                window.location.reload()
                            }}>Reset
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default MisExtendedDbComponent;