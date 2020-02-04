import React, {Component} from 'react';
import AdminInputContainer from "../../layouts/AdminInputContainer/AdminInputContainer";

class LocationsComponent extends Component {
    render() {
        // const formData = [
        //     {
        //         displayName: 'Location Name',
        //         filedName: 'location_name',
        //     },
        //     {
        //         displayName: 'Location Code',
        //         filedName: 'location_code',
        //     },
        //     {
        //         displayName: 'Parent',
        //         filedName: 'parent_id',
        //         dropdown: 'LocationOptions'
        //     },
        //     {
        //         displayName: 'Hierarchy',
        //         filedName: 'hierarchy',
        //         dropdown: 'hierarchyOptoins'
        //     },
        // ]
        return (
            <AdminInputContainer
                formType = 'LOCATIONS'
                getApi = 'locations'
            />
        );
    }
}

export default LocationsComponent;