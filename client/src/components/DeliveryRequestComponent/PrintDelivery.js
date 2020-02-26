import React, {Component} from 'react';

class PrintDelivery extends Component {
    componentDidMount() {
        let printable = document.getElementById('ui-print').innerHTML
        document.body.innerHTML = printable
        window.print()
        this.props.comeBack()
        window.location.reload()
    }

    render() {
        const {resData} = this.props
        const list = resData.map((item, index) => {
            return(
                <div className={'table'} key={index}>
                    <p>{index + 1}</p>
                    <p>{item.brand}_{item.model}</p>
                    <p>{item.update_quantity}</p>
                </div>
            )
        })
        return (
            <html id={'ui-print'}>
            <link rel="stylesheet" href="./multiselect.css" />
                <body>
                    <div className={'ui-print'}>
                        <div className="print-header">
                            <h5>iGrid Requisition Delivery</h5>
                            <strong>Some Branch Name, Gate No, and Other Info</strong>
                            <strong>Location Information</strong>
                        </div>
                        <div className="print-body">
                            <div className="client-info">
                                <div>
                                    <p><b>Name: {resData[0].username}</b></p>
                                    <p><b>Area: {resData[0].location_name}</b></p>
                                </div>
                                <div>
                                    <p><b>Date: {new Date().toLocaleDateString()}</b></p>
                                    <p><b>Request No: {resData[0].requisition_no}</b></p>
                                </div>
                            </div>
                            <div className="delivery-info">
                                <div className={'table'}>
                                    <p><b>SL.</b></p>
                                    <p><b>Item Name</b></p>
                                    <p><b>Quantity</b></p>
                                </div>
                                {list}
                            </div>
                        </div>
                        <div className="print-footer">
                            <p>Signature:</p>
                            <p>Name of Automation Staff:</p>
                        </div>
                    </div>
                </body>
            </html>
        );
    }
}

export default PrintDelivery;