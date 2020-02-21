import React, {Component} from 'react';
import DocumentInputContainer from "../../layouts/DocumentInputContainer/DocumentInputContainer";
import AdminInputContainer from "../../layouts/AdminInputContainer/AdminInputContainer";

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
                    title='Document Category List'
                    headTitle = 'Document Category Information'
                />
            </>
        );
    }
}

export default DocumentCategory;