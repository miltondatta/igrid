import React, {Component} from 'react';
import AdminInputContainer from "../../layouts/AdminInputContainer/AdminInputContainer";

class AssetSubCategoryComponent extends Component {
    render() {
        return (
            <AdminInputContainer
                formType = 'ASSETSUBCATEGORY'
                getApi = 'asset-sub-category'
                title = 'Asset Sub Category List'
                headTitle = 'Asset Sub Category Information'
            />
        );
    }
}

export default AssetSubCategoryComponent;