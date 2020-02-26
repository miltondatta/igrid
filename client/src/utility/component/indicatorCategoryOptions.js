import React, {Component} from 'react';
import Axios from "axios";
import {apiUrl} from "../constant";

class IndicatorCategoryOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            indicatorCategory: []
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        Axios.get(apiUrl() + 'mis/indicator/category/all')
            .then(resData => {
                this.setState({
                    indicatorCategory: resData.data
                })
            })
    };

    render() {
        if (this.props.stateForceUpdate) {
            this.getData();
            this.props.forceUp()
        }
        const {indicatorCategory} = this.state;
        const options = indicatorCategory.length > 0 && indicatorCategory.map((item, index) => (
            <option key={index} value={item.id}>{item.indicatormaster_name}</option>
        ));

        return (
            <>
                {options}
            </>
        );
    }
}

export default IndicatorCategoryOptions;