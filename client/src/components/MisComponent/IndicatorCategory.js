import React, {Component} from 'react';
import MisInputContainer from "../../layouts/MisInputContainer/MisInputContainer";

class IndicatorCategory extends Component {
    constructor(props) {
        super(props);
        this.table_header = ['Serial No', 'Category Name', 'Indicator Code', 'Description', 'Is Default', 'Action'];
    }

    render() {
        return (
            <>
                <MisInputContainer
                    formType='INDICATORCATEGORY'
                    getApi='mis/indicator/category'
                    table_header={this.table_header}
                    title='Indicator Category List'
                    headTitle='Indicator Category Information'
                />
            </>
        );
    }
}

export default IndicatorCategory;