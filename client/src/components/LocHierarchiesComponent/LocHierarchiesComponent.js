import React, {Component} from 'react';
import AdminInputContainer from "../../layouts/AdminInputContainer/AdminInputContainer";

class LocHierarchiesComponent extends Component {
    render() {
        return (
            <div>
                <AdminInputContainer
                    formType = 'LOCHIERARCHY'
                    getApi = 'locHierarchies'
                    title = 'Location Hierarchy List'
                    headTitle = 'Location Hierarchy Information'
                />
            </div>
        );
    }
}

export default LocHierarchiesComponent;