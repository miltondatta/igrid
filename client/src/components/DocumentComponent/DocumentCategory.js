import React, {Component} from 'react';
import DocumentInputContainer from "../../layouts/DocumentInputContainer/DocumentInputContainer";

class DocumentCategory extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <DocumentInputContainer
                    formType='DOCUMENTCATEGORY'
                    getApi='document/category'
                    title='Document Category List'
                    headTitle='Document Category Information'
                />
            </>
        );
    }
}

export default DocumentCategory;