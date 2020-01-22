import React, {Component} from 'react';
import AdminInputContainer from "../../layouts/AdminInputContainer/AdminInputContainer";

class DepMethodComponent extends Component {
    render() {
        return (
            <>
                <AdminInputContainer
                    formType = 'DEPMETHOD'
                    getApi = 'depreciation-methods'
                />
            </>
        );
    }
}

export default DepMethodComponent;