import React, {Component} from 'react';
import AdminInputContainer from "../../layouts/AdminInputContainer/AdminInputContainer";

class VendorComponent extends Component {
    render() {
        return (
            <>
                <AdminInputContainer
                    formType = 'VENDOR'
                    getApi = 'vendors'
                />
            </>
        );
    }
}

export default VendorComponent;