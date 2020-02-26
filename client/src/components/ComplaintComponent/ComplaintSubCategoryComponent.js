import React, {Component} from 'react';
import AdminInputContainer from "../../layouts/AdminInputContainer/AdminInputContainer";

class ComplaintSubCategoryComponent extends Component {
    render() {
        return (
            <AdminInputContainer
                formType = 'COMSUBCATEGORY'
                getApi = 'com-sub-category'
                title = 'Complaint Sub Category List'
                headTitle = 'Complaint Sub Category Information'
            />
        );
    }
}

export default ComplaintSubCategoryComponent;