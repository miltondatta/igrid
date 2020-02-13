import React, {Component} from 'react';
import DocumentInputContainer from "../../layouts/DocumentInputContainer/DocumentInputContainer";

class DocumentCategory extends Component {
    render() {
        return (
            <>
                <DocumentInputContainer
                    formType = 'DOCUMENTCATEGORY'
                    getApi = '/api/document/category/'
                />
            </>
        );
    }
}

export default DocumentCategory;