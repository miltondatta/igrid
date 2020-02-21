import React, {Component} from 'react';
import AdminInputContainer from "../../layouts/AdminInputContainer/AdminInputContainer";

class ProjectComponent extends Component {
    render() {
        return (
            <AdminInputContainer
                formType = 'PROJECT'
                getApi = 'projects'
                title = 'Project List'
                headTitle = 'Project Information'
            />
        );
    }
}

export default ProjectComponent;