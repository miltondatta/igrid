import React, {Component} from "react";
import {withRouter} from 'react-router-dom';
import Axios from "axios";
import {apiUrl} from "../../utility/constant";
import moment from "moment";
import {apiBaseUrl} from '../../utility/constant';


moment.locale('en');

class DocumentListDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            item: [],
            isLoading: false,
            fileError: '',
            fileErrorMessage: '',
            url: ''
        }
    }

    componentDidMount() {
        this.getData();

        if (this.state.item) {
            this.setState( {
                url: apiBaseUrl + '1_mk1-6aYaf_Bes1E3Imhc0A (6).jpeg'
            })
        }
    }

    getData = () => {
        const {id} = this.props.match.params;
        this.setState({
            isLoading: true
        }, () => {
            Axios.get(apiUrl() + 'document/list/details/' + id)
                .then(res => {
                    this.setState({
                        item: res.data
                    })
                })
                .then(() => {
                    this.setState({
                        isLoading: false
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        })
    };

    downloadFile = (e, file_name) => {
        e.preventDefault();

        Axios.get(apiUrl() + 'document/list/download/' + file_name)
            .then(() => {
                const link = document.createElement('a');
                link.href = apiUrl() + 'document/list/download/' + file_name;
                link.setAttribute('download', file_name);
                link.click();

                this.setState({
                    fileError: false
                })
            })
            .catch(err => {
                const {error, msg} = err.response.data;
                if (msg) {
                    this.setState({
                        fileError: error,
                        fileErrorMessage: error && msg
                    })
                }
                console.log(err.response);
            })
    };

    render() {
        const {item, fileError, fileErrorMessage} = this.state;

        return (
            <>
                {fileError &&
                <div className="row ml-1">
                    <div className="col-md-4 alert alert-danger" role="alert">
                        {fileErrorMessage}
                    </div>
                </div>
                }
                <div className="ui-dataEntry">
                    <div className="bg-white p-3">
                        <div className="row">
                            <div className="col-md-3">
                                <ul className="list-unstyled pl-1"
                                    style={{fontWeight: 600, fontSize: 18, lineHeight: 1.8}}>
                                    <li>Category</li>
                                    <li>Sub Category</li>
                                    <li>Title</li>
                                    <li>Content Type</li>
                                    <li>Circular Number</li>
                                    <li>Display Notice</li>
                                    <li>Status</li>
                                </ul>
                            </div>
                            <div className="col-md-1">
                                <ul className="list-unstyled" style={{fontWeight: 600, fontSize: 18, lineHeight: 1.8}}>
                                    <li>:</li>
                                    <li>:</li>
                                    <li>:</li>
                                    <li>:</li>
                                    <li>:</li>
                                    <li>:</li>
                                    <li>:</li>
                                </ul>
                            </div>
                            <div className="col-md-8">
                                <ul className="list-unstyled" style={{fontWeight: 600, fontSize: 18, lineHeight: 1.8}}>
                                    <li>{item.document_category && item.document_category.category_name}</li>
                                    <li>{item.document_sub_category && item.document_sub_category.sub_category_name}</li>
                                    <li>{item.title}</li>
                                    <li>{item.content_type ? 'Notice' : 'Circular'}</li>
                                    <li>{item.circular_no}</li>
                                    <li>{item.display_notice ? 'On' : 'Off'}</li>
                                    <li>{item.status ? 'Active' : 'Inactive'}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-3">
                        <div className="row">
                            <div className="col-md-2">
                                <ul className="list-unstyled pl-1"
                                    style={{fontWeight: 600, fontSize: 18, lineHeight: 1.8}}>
                                    <li>Document Date</li>
                                    <li>Description</li>
                                </ul>
                            </div>
                            <div className="col-md-1">
                                <ul className="list-unstyled" style={{fontWeight: 600, fontSize: 18, lineHeight: 1.8}}>
                                    <li>:</li>
                                    <li>:</li>
                                </ul>
                            </div>
                            <div className="col-md-9">
                                <ul className="list-unstyled" style={{fontWeight: 600, fontSize: 18, lineHeight: 1.8}}>
                                    <li>{moment(item.document_date).format('dddd MM, YYYY hh:mm a')}</li>
                                    <li style={{fontWeight: 400}}
                                        dangerouslySetInnerHTML={{__html: item.description}}></li>
                                </ul>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-2">
                                <ul className="list-unstyled pl-1"
                                    style={{fontWeight: 600, fontSize: 18, lineHeight: 1.8}}>
                                    <li>File Download</li>
                                </ul>
                            </div>
                            <div className="col-md-1">
                                <ul className="list-unstyled" style={{fontWeight: 600, fontSize: 18, lineHeight: 1.8}}>
                                    <li>:</li>
                                </ul>
                            </div>
                            <div className="col-md-9">
                                <ul className="list-unstyled" style={{fontWeight: 600, fontSize: 18, lineHeight: 1.8}}>
                                    <li>
                                        <a href="/"
                                           onClick={e => this.downloadFile(e, item.file_name)}>{item.file_name}</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {item.file_name &&
                        <div className="row">
                            <div className="col-md-12">
                                {/*<iframe*/}
                                {/*    src={apiBaseUrl + item.file_name}*/}
                                {/*    frameBorder="0" width="100%" height="700px">*/}

                                {/*</iframe>*/}
                               {/* <iframe
                                    src={this.state.url}
                                    width="600" width="100%" height="700px" frameBorder="0" sandbox="allow-scripts"></iframe>*/}

                            </div>
                        </div>
                        }
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(DocumentListDetails);