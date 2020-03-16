import React, {Component} from "react";
import axios from 'axios';
import {apiUrl} from "../../utility/constant";

class MenuComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuData: [],
            menuTableData: [],
            success: false,
            error: false,
            successMessage: '',
            errorMessage: '',
            errorObj: null,
            isLoading: false
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        this.setState({
            isLoading: true
        }, () => {
            axios.get(apiUrl() + 'menu/get')
                .then(res => {
                    this.setState({
                        menuData: res.data,
                        isLoading: false
                    }, () => {
                        res.data.length > 0 && res.data.map(module => {
                            module !== null && module.length > 0 && module.map(menu => {
                                menu.submenus.length > 0 && menu.submenus.map(submenu => {
                                    console.log(submenu);
                                });
                            });
                        });
                    });
                })
                .catch(err => {
                    console.log(err.response);
                })
        });
    };

    render() {
        return <h3>Hello Menu</h3>;
    }
}

export default MenuComponent;