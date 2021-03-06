import React, {Component} from 'react';
import AdminInputContainer from "../../layouts/AdminInputContainer/AdminInputContainer";

class LocHierarchiesComponent extends Component {
    render() {
        return (
            <div>
                <AdminInputContainer
                    formType = 'LOCHIERARCHY'
                    getApi = 'locHierarchies'
                    title = 'Location Type List'
                    headTitle = 'Location Type Information'
                />
            </div>
        );
    }
}

export default LocHierarchiesComponent;