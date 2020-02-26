import React, {Component} from 'react';
import MisInputContainer from "../../layouts/MisInputContainer/MisInputContainer";

class DocumentSubCategory extends Component {
    constructor(props) {
        super(props);
        this.table_header = ['Serial No', 'Category Name', 'Indicator Name', 'Item No', 'Location', 'Order By', 'Is Default', 'Action'];
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

export default DocumentSubCategory;