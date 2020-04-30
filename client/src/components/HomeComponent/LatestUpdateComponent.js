import React, {Component} from 'react';
import Axios from "axios";
import {apiUrl} from "../../utility/constant";
import Spinner from "../../layouts/Spinner";
import moment from "moment";

moment.locale('en');

class LatestUpdateComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allData: [],
            isLoading: false
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        let document_date = moment().subtract(6, 'days').format('YYYY-MM-DD');
        this.setState({
            isLoading: true
        }, () => {
            Axios.get(apiUrl() + 'document/list/by/notice/' + document_date)
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
        const {allData, isLoading} = this.state;
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
                <div className={'p-2 overflow-hidden ui-notice-container'}>
                    <div className="ui-notice">
                        <div className="noticeText">
                            {allNotice}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LatestUpdateComponent;