import Axios from "axios";
import React, {Component} from 'react';
import {apiUrl} from "../../utility/constant";
import ReactDataTable from "../../module/data-table-react/ReactDataTable";

class ProjectComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            allProjects: [],
            project_name: '',
            project_code: '',
            description: '',
            isLoading: false,
            errorMessage: '',
            error: false,
            editId: null
        }
    }

    handleChange = (e) => {
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    componentDidMount = () => {
        this.getProjects()
    }

    getProjects = () => {
        this.setState({
            isLoading: true
        }, () => {
            Axios.get(apiUrl() + '/projects')
                .then(res => {
                    this.setState({
                        allProjects: res.data
                    })
                })
                .then(res => {
                    this.setState({
                        isLoading: false
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        })
    }

    submitProducts = () => {
        const {project_name, project_code, description} = this.state
        const data = {project_name, project_code, description}
        Axios.post(apiUrl() + '/projects/entry', data)
            .then(res => {
                console.log(res)
                if(res.data.message){
                    this.setState({
                        error: true,
                        errorMessage: res.data.message
                    })
                }
            })
            .then(res => {
                this.setState({
                    allProjects: [],
                    project_name: '',
                    project_code: '',
                    description: '',
                })
                this.getProjects()
            })
            .catch(err => {
                console.log(err)
            })
    }

    updateEdit = (id) => {
        const {allProjects} = this.state
        this.setState({
            editId: id
        }, () => {
            allProjects.find(item => {
                if (item.id === id) {
                    console.log(item)
                    this.setState({
                        project_name: item.project_name,
                        project_code: item.project_code,
                        description: item.description,
                    })
                }
            })
        })
    }

    updateProject = () => {
        const {editId} = this.state
        const {project_name, project_code, description} = this.state
        const data = {project_name, project_code, description}
        Axios.put(apiUrl() + 'projects/update/' + editId, data)
            .then(resData => {
                console.log(resData)
            })
            .then(res => {
                this.setState({
                    allProjects: [],
                    project_name: '',
                    project_code: '',
                    description: '',
                })
                this.getProjects()
            })
    }

    render() {
        const {project_name, project_code, description, allProjects, isLoading, editId, error, errorMessage} = this.state
        return (
            <div className="px-2 my-2">
                {error && <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>}
                {editId === null ? <div className={'bg-white rounded p-3 my-2'}>
                    <div className="row px-2">
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-4">
                                    Project Name
                                </div>
                                <div className="col-md-8 ui-checkbox d-flex align-items-center">
                                    <input
                                        placeholder='Project Name'
                                        type={'text'}
                                        name={'project_name'}
                                        value={project_name}
                                        onChange={this.handleChange}
                                        className={'form-control'}  />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-4">
                                    Project Code
                                </div>
                                <div className="col-md-8">
                                    <input
                                        placeholder='Project Code'
                                        type={'text'}
                                        name={'project_code'}
                                        value={project_code}
                                        onChange={this.handleChange}
                                        className={'form-control'} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row px-2 my-2">
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-4">
                                    Description
                                </div>
                                <div className="col-md-8">
                                        <textarea
                                            placeholder='Description'
                                            name={'description'}
                                            value={description}
                                            onChange={this.handleChange}
                                            className={'form-control'} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <button className="btn btn-outline-info mt-3" onClick={this.submitProducts}>Submit Projects</button>
                        </div>
                    </div>
                </div> : <div className={'bg-white rounded p-2 my-2'}>
                    <nav className="navbar text-center mb-2 pl-2 rounded">
                        <p className="text-dark f-weight-500 f-20px m-0">Update Projects</p>
                    </nav>
                    <div className="row px-2">
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-4">
                                    Project Name
                                </div>
                                <div className="col-md-8 ui-checkbox d-flex align-items-center">
                                    <input
                                        placeholder='Project Name'
                                        type={'text'}
                                        name={'project_name'}
                                        value={project_name}
                                        onChange={this.handleChange}
                                        className={'form-control'}  />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-4">
                                    Project Code
                                </div>
                                <div className="col-md-8">
                                    <input
                                        placeholder='Project Code'
                                        type={'text'}
                                        name={'project_code'}
                                        value={project_code}
                                        onChange={this.handleChange}
                                        className={'form-control'} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row px-2 my-2">
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-4">
                                    Description
                                </div>
                                <div className="col-md-8">
                                        <textarea
                                            placeholder='Description'
                                            name={'description'}
                                            value={description}
                                            onChange={this.handleChange}
                                            className={'form-control'} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <button className="btn btn-outline-info mt-3 mr-2" onClick={this.updateProject}>Update Projects</button>
                            <button className="btn btn-outline-danger mt-3" onClick={() => {this.setState({editId: null})}}>Go Back</button>
                        </div>
                    </div>
                </div>}
                <div className={'bg-white rounded p-2 my-2'}>
                    <nav className="navbar text-center mb-2 pl-2 rounded">
                        <p className="text-dark f-weight-500 f-20px m-0">Projects List</p>
                    </nav>
                    {isLoading ? <h2>Loading</h2> : allProjects.length > 0 ? <>
                        <ReactDataTable
                            edit
                            del={'projects'}
                            isLoading
                            updateEdit={this.updateEdit}
                            tableData={allProjects}
                        />
                    </> : <h4>Currently There are No Projects</h4>}
                </div>

            </div>
        );
    }
}

export default ProjectComponent;