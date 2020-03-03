import React, {Component} from 'react';

class ImportCSVComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            import_data_file: ''
        };
    }

    handleFileChange = (e) => {
        console.log(e.target);
        const {name, value, files} = e.target
        this.setState({import_data_file: files[0]})
    }


    render() {
        const {title, headTitle} = this.props;
        const { import_data_file }  = this.state;
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
                        <button className="submit-btn" onClick={this.submitLostAssets}>Submit</button>
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