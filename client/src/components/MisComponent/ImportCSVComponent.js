import React, {Component} from 'react';
import Axios from "axios";
import {apiUrl} from "../../utility/constant";


class ImportCSVComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            import_data_file: null,
            success: null,
            message: ''
        };
    }

    handleFileChange = (e) => {
        const {name, value, files} = e.target
        this.setState({import_data_file: files[0]})
    }

    handleSubmit = (e) => {
        const { import_data_file } = this.state;    
        if(!import_data_file) {
            this.setState({
                success: false,
                message: "Please upload a csv file to submit"
            });
            return;
        }
        const formData = new FormData();
        formData.append('file', import_data_file)
        Axios.post(apiUrl() + 'mis/import/csv', formData)
            .then(resData => {
                    this.setState({
                        success: true,
                        message: resData.data.message,
                        import_data_file: null
                    });                
            }).catch(err => {
                this.setState({
                    success: false,
                    message: err.response.data.message
                })
            })

    }


    render() {
        const {title, headTitle} = this.props;
        const { import_data_file, success, message }  = this.state;
        return (
            <>
                {typeof success === "boolean" && !success &&
                <div
                    className="alert alert-danger mx-2 mb-2 position-relative d-flex justify-content-between align-items-center mt-2"
                    role="alert">
                    {message} <i className="fas fa-times " onClick={() => {
                    this.setState({success: null})
                }}></i>
                </div>}
                {success &&
                <div
                    className="alert alert-success mx-2 mb-2 position-relative d-flex justify-content-between align-items-center mt-2"
                    role="alert">
                    {message} <i className="fas fa-times " onClick={() => {
                    this.setState({success: null})
                }}></i>
                </div>}


                <div className="px-2 my-2 ui-dataEntry">
                    <div className={`bg-white rounded p-2 max-h-80vh position-relative`}>
                        <nav className="navbar text-center mb-2 pl-2 rounded">
                            <p className="text-blue f-weight-700 f-20px m-0">{headTitle}</p>
                        </nav>
                        <div className="mb-20p grid-2">
                            <div className="ui-custom-file">
                                <input type="file" onChange={this.handleFileChange} name={'import_data_file'} id="validatedCustomFile"
                                    required />
                                <label htmlFor="validatedCustomFile">{(import_data_file && import_data_file.name) ? import_data_file.name : (import_data_file ? import_data_file : 'Choose file')}</label>
                            </div>
                        </div>
                        <button className="submit-btn" onClick={this.handleSubmit}>Submit</button>
                    </div>
                    <div className="rounded bg-white max-h-80vh">
                        <nav className="navbar text-center mb-2 pl-3 rounded">
                            <p className="text-blue f-weight-700 f-20px m-0">{title}</p>
                        </nav>
                    </div>
                </div>
            </>
        );
    }
}

export default ImportCSVComponent;