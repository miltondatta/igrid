import React, {Component} from 'react';
import Axios from "axios";
import {apiUrl} from "../../utility/constant";


class ImportCSVComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            import_data_file: null,
            error: false,
            errorMessage: '',
            successMessage: '',
            success: false
        };

        this.import_data_files = [];
    }

    handleFileChange = (e) => {
        const {name, value, files} = e.target
        this.setState({import_data_file: files[0]})
        
        this.import_data_files.push(files[0]);
        
    }

    handleSubmit = (e) => {
        const { import_data_files } = this.state;
        const formData = new FormData();

        for (const key of Object.keys(this.import_data_files)) {
            formData.append('file', this.import_data_files[key])
        }


        //formData.append('file', import_data_files[0]);
        //formData.append('file', import_data_files[0]);

        Axios.post(apiUrl() + 'mis/import/csv', formData)
            .then(resData => {
                if (resData.data.status) {
                    console.log(resData, 31)
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


    render() {
        const {title, headTitle} = this.props;
        const { import_data_file, errorMessage, successMessage, success, error }  = this.state;
        return (
            <>
                <div className="px-2 my-2 ui-dataEntry">
                    <div className={`bg-white rounded p-2 min-h-80vh position-relative`}>
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
                    <div className="rounded bg-white min-h-80vh">
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