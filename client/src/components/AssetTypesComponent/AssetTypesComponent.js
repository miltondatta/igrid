import React, {Component} from 'react';
import AdminInputContainer from "../../layouts/AdminInputContainer/AdminInputContainer";

class AssetTypesComponent extends Component {
    render() {
        return (
            <div>
                <AdminInputContainer
                    formType = 'ASSETTYPES'
                    getApi = 'assets-types'
                />
            </div>
        );
    }
}

export default AssetTypesComponent;