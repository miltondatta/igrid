import React, {Component} from 'react';
import MisInputContainer from "../../layouts/MisInputContainer/MisInputContainer";

class IndicatorCategory extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <MisInputContainer
                    formType='INDICATORCATEGORY'
                    getApi='mis/indicator/category'
                    title='Indicator Category List'
                    headTitle='Indicator Category Information'
                />
            </>
        );
    }
}

export default IndicatorCategory;