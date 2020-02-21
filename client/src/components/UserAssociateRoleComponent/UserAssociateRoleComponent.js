import React, {Component} from 'react';
import AdminInputContainer from "../../layouts/AdminInputContainer/AdminInputContainer";

class   UserAssociateRoleComponent extends Component {
    render() {
        return (
            <AdminInputContainer
                formType = 'USERASSOCIATE'
                getApi = 'user-associate-roles'
                title = 'User Associate Role List'
                headTitle = 'User Associate Role Information'
            />
        );
    }
}

export default UserAssociateRoleComponent;