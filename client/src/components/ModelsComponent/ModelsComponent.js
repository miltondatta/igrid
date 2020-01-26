import React, {Component} from 'react';
import AdminInputContainer from "../../layouts/AdminInputContainer/AdminInputContainer";

class ModelsComponent extends Component {
    render() {
        return (
            <AdminInputContainer
                formType = 'MODELS'
                getApi = 'models'
            />
        );
    }
}

export default ModelsComponent;