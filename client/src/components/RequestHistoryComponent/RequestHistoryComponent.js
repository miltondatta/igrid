import React, {Component} from 'react';

class RequestHistoryComponent extends Component {
    render() {
        return (
            <div className={'bg-glass w-90 mx-auto p-3 mt-4 rounded'}>
                <nav className="navbar bg-pink text-center mb-3 p-2 rounded">
                    <p className="text-white m-0">Request History</p>
                </nav>
                <table className="table table-bordered table-dark">
                    <thead>
                    <tr>
                        <th scope="col">Delete</th>
                        <th scope="col">Date</th>
                        <th scope="col">Request ID</th>
                        <th scope="col">Requested By</th>
                        <th scope="col">Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default RequestHistoryComponent;