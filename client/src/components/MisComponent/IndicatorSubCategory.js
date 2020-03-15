import React, {Component} from 'react';
import MisInputContainer from "../../layouts/MisInputContainer/MisInputContainer";

class IndicatorSubCategory extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <MisInputContainer
                    formType='INDICATORSUBCATEGORY'
                    getApi='mis/indicator/sub/category'
                    title='Indicator List'
                    headTitle='Indicator Information'
                />
            </>
        );
    }
}

export default IndicatorSubCategory;