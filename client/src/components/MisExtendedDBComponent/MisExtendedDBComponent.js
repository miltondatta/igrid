import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './misextended.css'
import GridLayout, { WidthProvider, Responsive } from "react-grid-layout";
import {MultiSelect} from 'primereact/multiselect';
import moment from "moment";
import {Dropdown} from 'primereact/dropdown';
import React, {Component} from 'react';
import DatePicker from 'react-datepicker2';
import { Bar, HorizontalBar, Line, Radar } from 'react-chartjs-2';
import LocationsWithHOptions from "../../utility/component/locationWithHierarchy";
import Axios from "axios";
import {apiUrl} from "../../utility/constant";
import ErrorModal from "../../utility/error/errorModal";


const ResponsiveReactGridLayout = WidthProvider(Responsive);

class MisExtendedDbComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            parentID: 0,
            selectedGraps: '',
            selectGrapsInd: '',
            error: false,
            date_from: moment(),
            date_to: moment(),
            hierarchies: [],
            indicatorOptions: [],
            indicator: [],
            graphDatas: []
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
        const {date_from, date_to, parentID, indicator} = this.state
        let errorDict = {
            date_from: typeof date_from !== 'undefined' && date_from !== '',
            date_to: typeof date_to !== 'undefined' && date_to !== '',
            parentID: typeof parentID !== 'undefined' && parentID !== 0,
            indicator: typeof indicator !== 'undefined' && indicator.length > 0,
        }
        this.setState({
            errorDict
        })
        return errorDict
    }

    handleSubmit = () => {
        if (Object.values(this.validate()).includes(false)) return;
        const { parentID, date_from, date_to, indicator} = this.state

        let requestParams = {
            parentID: parentID,
            date_from: date_from,
            date_to: date_to,
            indicator_ids: indicator
        };

        Axios.post(apiUrl() + 'mis/extended/dashboard/graph/data', requestParams)
            .then(res => {
                    let resDatas       = res.data; 
                    let tempGraphDatas = [];

                    resDatas.forEach(element => {
                        let colorHolder = ['rgba(155,48,255,.6)','rgba(255,222,0,.6)','rgba(102,205,170,.6)','rgba(11,152,222,.6)','rgba(204,65,37,.6)','rgba(254,200,255,.6)','rgba(102,102,153,.6)']
                        let hoverColorHolder = ['rgba(155,48,255,.3)','rgba(255,222,0,.3)','rgba(102,205,170,.3)','rgba(11,152,222,.3)','rgba(204,65,37,.3)','rgba(254,200,255,.3)','rgba(102,102,153,.3)']
                        let randomCol =  colorHolder[Math.floor((Math.random() * colorHolder.length))]
                        let randomHover =  hoverColorHolder[Math.floor((Math.random() * hoverColorHolder.length))]

                        const gHolder = [Bar, HorizontalBar, Radar, Line]
                        const RandomGraps = gHolder[Math.floor((Math.random() * gHolder.length))]
                        let gdata = {
                            chart: RandomGraps,
                            labels: element.graphLabels,
                            datasets: [
                                {
                                    label: element.label,
                                    backgroundColor: randomCol,
                                    borderColor: 'black',
                                    borderWidth: 1,
                                    hoverBackgroundColor: randomHover,
                                    hoverBorderColor: 'black',
                                    data: element.graphDatas
                                }
                            ]
                        };
                        tempGraphDatas.push(gdata);
                    });
                    this.setState({
                       graphDatas: tempGraphDatas
                    });
            });
    }

    removeGraph = (ind) => {
        const graphDatasCstom = this.state.graphDatas
        this.setState({
            graphDatas: graphDatasCstom.filter((item, index) => index !== ind)
        })
    }

    render() {
        const {graphDatas ,hierarchies, parentID, date_from, date_to, errorMessage, error, errorDict, indicatorOptions, indicator, selectedGraps, selectGrapsInd} = this.state

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


        const layout = [];
        let incX = 0
        let incY = 0
        graphDatas.length > 0 && graphDatas.forEach((item, index) => {
            layout.push({i: index.toString(), x: incX, y: incY, w: 3, h: window.innerWidth < 1300 ? 2.5 : 3})
            if (incX <= 6) {
                incX += 3
            } else {
                incX = 0
            }
        })

        console.log(this.state, 190)

        const chartTypes = [
            {name: 'Bar', code: Bar},
            {name: 'HorizontalBar', code: HorizontalBar},
            {name: 'Radar', code: Radar},
            {name: 'Line', code: Line}
        ];

        const drawGraph = graphDatas.length > 0 && graphDatas.map((item, index) => {
            const RandomG =  this.state[index] ? this.state[index].code : item.chart
            return (
                <div className={'ui-mis-gsection'} key={index.toString()}>
                    <div className={'ui-graph-container'}>
                        <div className={'ui-top'}>
                            <h5 className={'p-2'}>{item.datasets[0].label}</h5>
                            <div className={'ui-dropdown'}><Dropdown optionLabel="name" value={this.state[index]} options={chartTypes} onChange={(e) => {this.setState({[index]: e.value, selectGrapsInd: index})}} placeholder="Graphs"/></div>
                            <i onClick={() => {this.removeGraph(index)}} className="icofont-brand-nexus"></i>
                        </div>
                        <div className={'ui-graph-holder'}>
                            <RandomG
                                data={item}
                                width={100}
                                height={50}
                                options={{
                                    maintainAspectRatio: false
                                }}
                            />
                        </div>
                    </div>
                </div>
            )
        })

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
                            <div className={`ui-section ${errorDict && !errorDict.indicator && 'red-select'}`}>
                                <MultiSelect value={indicator} options={indicatorOptions} placeholder="Choose Indicator" onChange={(e) => this.setState({indicator: e.value})} />
                            </div>
                        </div>
                        <div className="ui-btn-container rounded px-2">
                            <button onClick={this.handleSubmit} className={'mx-2 report-submit-btn'}>Submit</button>
                            <button className={'mx-2 report-reset-btn'} onClick={() => {
                                window.location.reload()
                            }}>Reset
                            </button>
                        </div>
                    </div>
                        {graphDatas.length > 0 && <GridLayout className="layout" layout={layout} cols={12} rowHeight={120} width={window.innerWidth}>
                            {drawGraph}
                        </GridLayout>}
                </div>
            </>
        );
    }
}

export default MisExtendedDbComponent;