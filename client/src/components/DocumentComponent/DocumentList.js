import React, {Component} from 'react';
import DocumentInputContainer from "../../layouts/DocumentInputContainer/DocumentInputContainer";

class DocumentList extends Component {
    constructor(props) {
        super(props);
        this.table_header = ['Serial No', 'Category Name', 'Sub Category Name', 'Content Type', 'Title', 'Circular No', 'Description', 'Display Notice', 'Action'];
    }

    render() {
        return (
            <>
                <DocumentInputContainer
                    formType = 'DOCUMENTLIST'
                    getApi = 'document/list'
                    table_header={this.table_header}
                    title='Document List'
                />
            </>
        );
    }
}

export default DocumentList;