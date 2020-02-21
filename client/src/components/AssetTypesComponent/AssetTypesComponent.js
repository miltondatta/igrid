import React, {Component} from 'react';
import AdminInputContainer from "../../layouts/AdminInputContainer/AdminInputContainer";

class AssetTypesComponent extends Component {
    render() {
        return (
            <div>
                <AdminInputContainer
                    formType = 'ASSETTYPES'
                    getApi = 'assets-types'
                    title = 'Asset Type List'
                    headTitle = 'Asset Type Information'
                />
            </div>
        );
    }
}

export default AssetTypesComponent;