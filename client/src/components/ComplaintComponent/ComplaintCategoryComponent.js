import React, {Component} from 'react';
import AdminInputContainer from "../../layouts/AdminInputContainer/AdminInputContainer";

class ComplaintCategoryComponent extends Component {
    render() {
        return (
            <AdminInputContainer
                formType = 'COMCATEGORY'
                getApi = 'com-category'
                title = 'Complaint Category List'
                headTitle = 'Complaint Category Information'
            />
        );
    }
}

export default ComplaintCategoryComponent;