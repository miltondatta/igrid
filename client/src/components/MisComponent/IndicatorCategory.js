import React, {Component} from 'react';
import MisInputContainer from "../../layouts/MisInputContainer/MisInputContainer";

class DocumentCategory extends Component {
    constructor(props) {
        super(props);
        this.table_header = ['Serial No', 'Category Name', 'Description', 'Indicator Code', 'Is Default', 'Action'];
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

export default DocumentCategory;