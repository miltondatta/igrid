import React, {Component} from 'react';
import MisInputContainer from "../../layouts/MisInputContainer/MisInputContainer";

class IndicatorSubCategory extends Component {
    constructor(props) {
        super(props);
        this.table_header = ['Serial No', 'Category Name', 'Location', 'Indicator Name', 'Item No', 'Order By', 'Is Default', 'Action'];
    }

    render() {
        return (
            <>
                <MisInputContainer
                    formType='INDICATORSUBCATEGORY'
                    getApi='mis/indicator/sub/category'
                    table_header={this.table_header}
                    title='Indicator List'
                    headTitle='Indicator Information'
                />
            </>
        );
    }
}

export default IndicatorSubCategory;