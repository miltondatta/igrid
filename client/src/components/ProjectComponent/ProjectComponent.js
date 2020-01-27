import React, {Component} from 'react';
import AdminInputContainer from "../../layouts/AdminInputContainer/AdminInputContainer";

class ProjectComponent extends Component {
    render() {
        return (
            <AdminInputContainer
                formType = 'PROJECT'
                getApi = 'projects'
            />
        );
    }
}

export default ProjectComponent;