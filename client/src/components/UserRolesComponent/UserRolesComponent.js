import React, {Component} from 'react';
import AdminInputContainer from "../../layouts/AdminInputContainer/AdminInputContainer";

class UserRolesComponent extends Component {
    render() {
        return (
            <AdminInputContainer
                formType = 'USERROLES'
                getApi = 'user-roles'
            />
        );
    }
}

export default UserRolesComponent;