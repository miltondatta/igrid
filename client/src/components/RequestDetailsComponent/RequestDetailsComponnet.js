import React, {Component} from 'react';

class RequestDetailsComponnet extends Component {
    render() {
        return (
            <div className={'row w-90 m-auto'}>
                <div className={'bg-glass col-5 mx-auto p-3 mt-4 rounded'}>
                    <nav className="navbar text-center mb-3 p-2 rounded">
                        <p className="text-dark f-weight-500 f-20px m-0">Request Info</p>
                    </nav>
                </div>
                <div className={'bg-glass col-6 mx-auto p-3 mt-4 rounded'}>
                    <nav className="navbar text-center mb-3 p-2 rounded">
                        <p className="text-dark f-weight-500 f-20px m-0">Request Details</p>
                    </nav>
                    <table className="table table-bordered table-dark">
                        <thead>
                        <tr>
                            <th scope="col">Request On</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Approved</th>
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    <button type="submit" onClick={this.handleSubmit} className="ui-btn">Back</button>
                </div>
            </div>
        );
    }
}

export default RequestDetailsComponnet;