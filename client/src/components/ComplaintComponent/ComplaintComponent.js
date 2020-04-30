import React, {Component} from 'react';
import AdminInputContainer from "../../layouts/AdminInputContainer/AdminInputContainer";

class ComplaintComponent extends Component {
    render() {
        return (
            <AdminInputContainer
                formType = 'COMPLAINT'
                getApi = 'complaints'
                title = 'Complaint List'
                headTitle = 'Complaint Information'
            />
        );
    }
}

export default ComplaintComponent;
