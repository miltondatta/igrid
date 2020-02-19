import React, {Component} from 'react';
import AdminInputContainer from "../../layouts/AdminInputContainer/AdminInputContainer";

class ProductComponent extends Component {
    render() {
        return (
            <>
                <AdminInputContainer
                    formType = 'PRODUCTS'
                    getApi = 'products'
                    title = 'Product List'
                    headTitle = 'Product Information'
                />
            </>
        );
    }
}

export default ProductComponent;