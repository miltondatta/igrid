import Axios from 'axios'
import React, {Component} from 'react';
import {apiUrl} from "../../utility/constant";

import jwt from "jsonwebtoken";
import ErrorModal from "../../utility/error/errorModal";
import SuccessModal from "../../utility/success/successModal";
import PrimeDataTable from "../../module/dataTableForProject/PrimeDataTable";
import NodataFound from "../../utility/component/nodataFound";

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
                                {lostAsFB.length > 0 ? <div className={'overflow-y-auto h-200px'}>
                                    <PrimeDataTable
                                        data={lostAsFB}
                                    />
                                </div>: <NodataFound />}

                                <nav className="navbar text-center mb-0 mt-1 pl-0 rounded">
                                    <p className="text-blue f-weight-700 f-20px m-0">Your Feedback</p>
                                </nav>
                                <div>
                                    <textarea name="feedback_details" onChange={this.handleChange} placeholder={'Your Feedback'} className={'ui-custom-textarea'} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="reset-btn-normal mt-2" data-dismiss="modal">Close</button>
                                <button type="button" className="submit-btn-normal mt-2" onMouseUp={this.submitFeedback}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded bg-white admin-input-height p-2 m-2">
                    <nav className="navbar text-center mb-0 mt-1 pl-2 rounded">
                        <p className="text-blue f-weight-700 f-20px m-0">Lost Asset Status</p>
                    </nav>
                    {lostAssets.length > 0 ?
                        <PrimeDataTable
                            feedback={true}
                            modal = '#lostAsset'
                            updateEdit={this.updateEdit}
                            data={lostAssets}
                        />
                    : <NodataFound />}
                </div>
            </>
        );
    }
}

export default LostAssetsStatusComponent;
