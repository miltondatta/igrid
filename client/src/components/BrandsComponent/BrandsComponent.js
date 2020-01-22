import React, {Component} from 'react';
import AdminInputContainer from "../../layouts/AdminInputContainer/AdminInputContainer";

class BrandsComponent extends Component {
    render() {
        return (
            <AdminInputContainer
                formType = 'BRANDS'
                getApi = 'brands'
            />
        );
    }
}

export default BrandsComponent;