import React, {Component} from 'react';
import DocumentInputContainer from "../../layouts/DocumentInputContainer/DocumentInputContainer";

class DocumentSubCategory extends Component {
    render() {
        return (
            <>
                <DocumentInputContainer
                    formType = 'DOCUMENTSUBCATEGORY'
                    getApi = '/api/document/sub/category/'
                />
            </>
        );
    }
}

export default DocumentSubCategory;