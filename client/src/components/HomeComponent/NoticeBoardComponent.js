import React, {Component} from 'react';
import Axios from "axios";
import {apiUrl} from "../../utility/constant";
import moment from "moment";

class NoticeBoardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noticeAndCircular: true,
            notice: false,
            circular: false,
            allData: []
        };
    }

    componentDidMount() {
        this.getData();
    }

    setNoticeOption = (input) => {
        const {noticeAndCircular, notice, circular} = this.state;
        this.setState({
            noticeAndCircular: (input === 'all') && !noticeAndCircular,
            notice: (input === 'notice') && !notice,
            circular: (input === 'circular') && !circular
        }, () => {
            this.getData();
        });
    };

    getData = () => {
        const {noticeAndCircular, notice, circular} = this.state;
        let apiText = '';
        apiText = (noticeAndCircular && 'document/list/active') || (notice && 'document/list/by/notice') || (circular && 'document/list/by/circular');

        Axios.get(apiUrl() + apiText)
            .then(res => {
                this.setState({
                    allData: res.data
                })
            })
            .catch(err => {
                console.log(err);
            })
    };

    render() {
        const {allData, noticeAndCircular, notice, circular} = this.state;
        let allNotice = allData.length > 0 ? allData.map((item, index) => (
            <div key={index}>
                <p className="mb-0"><i className="fas fa-angle-right mr-1"></i>{item.title}</p>
                <p className="mb-2 noticeDate">{moment(item.document_date).format('dddd MM, YYYY hh:mm a')}</p>
            </div>
        )) : <p>There is empty notice board</p>;

        return (
            <>
                <div>
                    <div className={'w-100 p-2 ui-noticeboard'}>
                        <div className="ui-notice">
                            <div className="noticeText">
                                {allNotice}
                            </div>
                        </div>
                    </div>
                </div>
                {allData.length > 0 &&
                <div className="ui-home">
                    <ul className="d-flex justify-content-start list-unstyled">
                        <li className={`btn ${noticeAndCircular ? 'btn-info' : 'btn-outline-info'} `}
                            onClick={() => this.setNoticeOption('all')}>All
                        </li>
                        <li className={`ml-2 btn ${notice ? 'btn-info' : 'btn-outline-info'} `}
                            onClick={() => this.setNoticeOption('notice')}>Notice
                        </li>
                        <li className={`ml-2 btn ${circular ? 'btn-info' : 'btn-outline-info'} `}
                            onClick={() => this.setNoticeOption('circular')}>Circular
                        </li>
                    </ul>
                </div>
                }
            </>
        );
    }
}

export default NoticeBoardComponent;