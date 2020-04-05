import Axios from 'axios'
import React, {Component} from 'react';
import {apiUrl} from "../../utility/constant";
import ReactDataTable from "../../module/data-table-react/ReactDataTable";
import jwt from "jsonwebtoken";
import ErrorModal from "../../utility/error/errorModal";
import SuccessModal from "../../utility/success/successModal";

class LostAssetsStatusComponent extends Component {

    constructor(props){
        super(props)
        this.state = {
            lostAssets: [],
            lostAsFB: [],
            assetId: '',
            error: false,
            success: false,
            errorMessage: '',
            successMessage: '',
            feedback_details: '',
        }
    }

    componentDidMount() {
        this.getLostAssets()
    }

    updateEdit = (id) => {
        this.setState({
            assetId: id
        }, () => {
            Axios.get(apiUrl() + 'lost-asset/feedback/' + id)
                .then(res => {
                    if (res.data.status) {
                        this.setState({
                            lostAsFB: res.data.data
                        })
                    }
                })
        })
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

    submitFeedback = () => {
        const {id} = jwt.decode(localStorage.getItem('user')) ? jwt.decode(localStorage.getItem('user')).data : '';
        const {feedback_details, assetId} = this.state

        const payLoad = {
            feedback_details,
            lost_asset_id: assetId,
            feedback_by: id
        }

        Axios.post(apiUrl() + 'lost-assets/feedback', payLoad)
            .then(res => {
                if(res.data.status) {
                    this.setState({
                        success: true,
                        successMessage: res.data.message,
                    }, () => {
                        window.location.reload()
                    })
                }
            })
    }

    handleChange = (e) => {
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    render() {
        const { error, errorMessage, successMessage, success, lostAssets, lostAsFB} = this.state
        return (
            <>
                {error &&
                <ErrorModal errorMessage={errorMessage} />
                }
                {success &&
                <SuccessModal successMessage={successMessage} />
                }

                {/*Modal*/}
                <div className="modal fade lost-asset-modal" id="lostAsset" tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Feedback</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {lostAsFB.length > 0 ? <div className={'overflow-y-auto h-200px'}> <ReactDataTable
                                    tableData = {lostAsFB}
                                /> </div>: <h4 className={'no-project px-2 mt-3'}><i className="icofont-exclamation-circle"></i> Currently There are No Data</h4>}

                                <nav className="navbar text-center mb-0 mt-1 pl-0 rounded">
                                    <p className="text-blue f-weight-700 f-20px m-0">Your Feedback</p>
                                </nav>
                                <div>
                                    <textarea name="feedback_details" onChange={this.handleChange} placeholder={'Your Feedback'} className={'ui-custom-textarea'} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="reset-btn-normal" data-dismiss="modal">Close</button>
                                <button type="button" className="submit-btn-normal" onMouseUp={this.submitFeedback}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded bg-white admin-input-height p-2 m-2">
                    <nav className="navbar text-center mb-0 mt-1 pl-2 rounded">
                        <p className="text-blue f-weight-700 f-20px m-0">Lost Asset Status</p>
                    </nav>
                    {lostAssets.length > 0 ? <ReactDataTable
                        feedback={true}
                        modal = '#lostAsset'
                        updateEdit={this.updateEdit}
                        tableData={lostAssets}
                    /> : <h4 className={'no-project px-2 mt-3'}><i className="icofont-exclamation-circle"></i> Currently There are No Data</h4>}
                </div>
            </>
        );
    }
}

export default LostAssetsStatusComponent;