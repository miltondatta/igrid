import React, {Component} from 'react';
import DocumentInputContainer from "../../layouts/DocumentInputContainer/DocumentInputContainer";

class DocumentList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <DocumentInputContainer
                    formType = 'DOCUMENTLIST'
                    getApi = 'document/list'
                    title='Document List'
                    headTitle = 'Document Information'
                />
            </>
        );
    }
}

export default DocumentList;