import React, {Component} from 'react';
import AdminInputContainer from "../../layouts/AdminInputContainer/AdminInputContainer";

class AssetCategoryComponent extends Component {
    render() {
        return (
            <AdminInputContainer
                formType = 'ASSETCATEGORY'
                getApi = 'asset-category'
                title = 'Asset Category List'
                headTitle = 'Asset Category Information'
            />
        );
    }
}

export default AssetCategoryComponent;