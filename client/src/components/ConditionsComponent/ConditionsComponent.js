import React, {Component} from 'react';
import AdminInputContainer from "../../layouts/AdminInputContainer/AdminInputContainer";

class ConditionsComponent extends Component {
    render() {
        return (
            <>
                <AdminInputContainer
                    formType = 'CONDITIONS'
                    getApi = 'conditions'
                />
            </>
        );
    }
}

export default ConditionsComponent;