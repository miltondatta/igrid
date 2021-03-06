import React, {Component} from 'react';
import AdminInputContainer from "../../layouts/AdminInputContainer/AdminInputContainer";

class ModulesComponent extends Component {
    render() {
        return (
            <AdminInputContainer
                formType = 'MODULE'
                getApi = 'modules'
                title = 'Module List'
                headTitle = 'Module Information'
            />
        );
    }
}

export default ModulesComponent;