import React, {Component} from 'react';
import AdminInputContainer from "../../layouts/AdminInputContainer/AdminInputContainer";

class ConditionsComponent extends Component {
    render() {
        return (
            <>
                <AdminInputContainer
                    formType = 'CONDITIONS'
                    getApi = 'conditions'
                    title = 'Condition List'
                    headTitle = 'Condition Information'
                />
            </>
        );
    }
}

export default ConditionsComponent;