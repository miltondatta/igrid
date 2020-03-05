import React, {Component} from 'react';
import AdminInputContainer from "../../layouts/AdminInputContainer/AdminInputContainer";

class AmcTypesComponent extends Component {
    render() {
        return (
            <AdminInputContainer
                formType = 'AMCTYPES'
                getApi = 'amc_types'
                title = 'AMC Type List'
                headTitle = 'AMC Type Information'
            />
        );
    }
}

export default AmcTypesComponent;