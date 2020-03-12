import React, {Component} from 'react';
import DocumentInputContainer from "../../layouts/DocumentInputContainer/DocumentInputContainer";

class DocumentSubCategory extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <DocumentInputContainer
                    formType='DOCUMENTSUBCATEGORY'
                    getApi='document/sub/category'
                    title='Document Sub Category List'
                    headTitle='Document Sub Category Information'
                />
            </>
        );
    }
}

export default DocumentSubCategory;