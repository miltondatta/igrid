import React, {Component} from 'react';
import AdminInputContainer from "../../layouts/AdminInputContainer/AdminInputContainer";

class UserRolesComponent extends Component {
    render() {
        return (
            <AdminInputContainer
                formType = 'USERROLES'
                getApi = 'user-roles'
                title = 'User Role List'
                headTitle = 'User Role Information'
            />
        );
    }
}

export default UserRolesComponent;