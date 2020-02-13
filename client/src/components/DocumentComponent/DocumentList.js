import React, {Component} from 'react';
import DocumentInputContainer from "../../layouts/DocumentInputContainer/DocumentInputContainer";

class DocumentList extends Component {
    render() {
        return (
            <>
                <DocumentInputContainer
                    formType = 'DOCUMENTLIST'
                    getApi = '/api/document/list/'
                />
            </>
        );
    }
}

export default DocumentList;