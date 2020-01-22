import React, {Component} from 'react';
import AdminInputContainer from "../../layouts/AdminInputContainer/AdminInputContainer";

class ProductComponent extends Component {
    render() {
        return (
            <>
                <AdminInputContainer
                    formType = 'PRODUCTS'
                    getApi = 'products'
                />
            </>
        );
    }
}

export default ProductComponent;