import React, {Component} from 'react';
import AdminInputContainer from "../../layouts/AdminInputContainer/AdminInputContainer";

class ApprovalLevelComponent extends Component {
    render() {
        return (
            <AdminInputContainer
                formType = 'USERAPPROVAL'
                getApi = 'approval_level'
                title = 'Approval Level'
            />
        );
    }
}

export default ApprovalLevelComponent;