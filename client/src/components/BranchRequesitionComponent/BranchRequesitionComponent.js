import React, {Component} from 'react';
import {requestOn} from "../../utility/constant";

class BranchRequesitionComponent extends Component {
    render() {
        return (
            <div className={'bg-white p-3 mt-4 rounded shadow'}>
                <nav className="navbar text-center mb-3 p-2 rounded">
                    <p className="text-dark f-weight-500 f-20px m-0">Branch Requisition</p>
                </nav>
                <table className="table table-bordered table-dark">
                    <thead className={'bg-gray-pink'}>
                    <tr>
                        <th scope="col">Sl</th>
                        <th scope="col">Branch Name</th>
                        <th scope="col">Branch ID.</th>
                        <th scope="col">Wireless Router</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Rakib Uddin</td>
                            <td>547</td>
                            <td>5</td>
                            <td className={'text-center'}><button type="submit" onClick={this.handleSubmit} className="ui-btn">Approve</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default BranchRequesitionComponent;