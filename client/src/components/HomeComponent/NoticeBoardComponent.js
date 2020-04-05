import React, {Component} from 'react';
import Axios from "axios";
import {apiUrl} from "../../utility/constant";
import moment from "moment";
import Spinner from "../../layouts/Spinner";

moment.locale('en');

class NoticeBoardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noticeAndCircular: true,
            notice: false,
            circular: false,
            isLoading: false,
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

        this.setState({
            isLoading: true
        }, () => {
            Axios.get(apiUrl() + apiText)
                .then(res => {
                    this.setState({
                        allData: res.data,
                        isLoading: false
                    })
                })
                .catch(err => {
                    console.log(err);
                })
        });
    };

    render() {
        const {allData, noticeAndCircular, notice, circular, isLoading} = this.state;
        let allNotice = isLoading ? <Spinner/> : allData.length > 0 ? allData.map((item, index) => (
            <div key={index}>
                <i className="fas fa-angle-right mr-1"></i>
                <a href={`/documents/details/${item.id}`} className="mb-0"
                   target="_blank">{item.title}</a>
                <p className="mb-2 noticeDate">{moment(item.document_date).format('MMMM Do YYYY, hh:mm a')}</p>
            </div>
        )) : <p>No Data to Display</p>;

        return (
            <div className={'ui-noticeboard'}>
                <div className={'p-2 overflow-hidden h-215px'}>
                    <div className="ui-notice">
                        <div className="noticeText">
                            {allNotice}
                        </div>
                    </div>
                </div>
                <div className="ui-home">
                    <ul className="d-flex list-unstyled-notice">
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
            </div>
        );
    }
}

export default NoticeBoardComponent;