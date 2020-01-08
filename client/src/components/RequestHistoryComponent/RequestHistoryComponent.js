import React, {Component} from 'react';

class RequestHistoryComponent extends Component {
    render() {
        return (
            <div className={'bg-white p-3 mt-4 rounded shadow'}>
                <nav className="navbar text-center mb-3 p-2 rounded">
                    <p className="text-dark f-weight-500 f-20px m-0">Request History</p>
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