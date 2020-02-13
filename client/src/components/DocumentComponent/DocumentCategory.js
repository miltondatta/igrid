import React, {Component} from 'react';
import DocumentInputContainer from "../../layouts/DocumentInputContainer/DocumentInputContainer";

class DocumentCategory extends Component {
    constructor(props) {
        super(props);
        this.table_header = ['Serial No', 'Category Name', 'Action'];
    }

    render() {
        return (
            <>
                <DocumentInputContainer
                    formType='DOCUMENTCATEGORY'
                    getApi='document/category'
                    table_header={this.table_header}
                />
            </>
        );
    }
}

export default DocumentCategory;