import React, {Component} from 'react';
import AdminInputContainer from "../../layouts/AdminInputContainer/AdminInputContainer";

class AssetCategoryComponent extends Component {
    render() {
        return (
            <AdminInputContainer
                formType = 'ASSETCATEGORY'
                getApi = 'asset-category'
            />
        );
    }
}

export default AssetCategoryComponent;