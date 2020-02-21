import React, {Component} from 'react';
import AdminInputContainer from "../../layouts/AdminInputContainer/AdminInputContainer";

class BrandsComponent extends Component {
    render() {
        return (
            <AdminInputContainer
                formType = 'BRANDS'
                getApi = 'brands'
                title = 'Brand List'
                headTitle = 'Brand Information'
            />
        );
    }
}

export default BrandsComponent;