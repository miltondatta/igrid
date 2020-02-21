import React, {Component} from 'react';
import DataTable, {createTheme} from "react-data-table-component";

createTheme('solarized', {
    table: {
        style: {
            textAlign: 'left',
            background: 'red'
        }
    }
});

const FilterOption = (props) => {
    return(
        <div>
            <input onChange={props.handleFilter} className={'rounded p-2 border'} placeholder={'Filter By Title'} />
        </div>
    )
}

class SupportHistoryComponent extends Component {

    constructor(props){
        super(props)
        this.state={
            filterText: ''
        }
    }

    handleFilter = (e) => {
        const {value} = e.target
        this.setState({
            filterText: value
        }, () => {
            console.log(this.state.filterText)
        })
    }

    render() {
        const {filterText} = this.state
        const columns = [
            {
                name: 'Date',
                selector: 'id',
                sortable: true,
            },
            {
                name: 'Complaint ID',
                selector: 'complaint_ID',
                sortable: true,
                right: true,
            },
            {
                name: 'Com. Raised By',
                selector: 'branch_id',
                sortable: true,
                right: true,
            },
            {
                name: 'Assigned To',
                selector: 'wirelessRouter',
                sortable: true,
                right: true,
            },
            {
                name: 'Eng. Mobile',
                selector: 'engMobile',
                sortable: true,
                right: true,
            },
            {
                name: 'Status',
                cell: () => <button className={'ui-btn'} onClick={(e) => {console.log(e.target.name, e.target.value)}}>Approve</button>,
                ignoreRowClick: true,
                allowOverflow: true,
                button: true,
            },
        ];
        const data = [
            {
                id: '18-12-2019',
                complaint_ID: '125',
                branch_id: 'Branch Manager',
                title: 'Conan the Barbarian',
                wirelessRouter: 'Divisional IT',
                engMobile: '0123456789',
            },
            {
                id: '18-12-2019',
                complaint_ID: '105',
                branch_id: 'Branch Manager',
                title: 'Learn React',
                wirelessRouter: 'Divisional IT',
                engMobile: '0123456789',
            },
            {
                id: '18-12-2019',
                complaint_ID: '115',
                branch_id: 'Branch Manager',
                title: 'Conan the Barbarian',
                wirelessRouter: 'Divisional IT',
                engMobile: '0123456789',
            },
        ];
        const filteredData = data.filter((item) => item.title.includes(filterText))
        return (
            <div className={'bg-white p-3 rounded shadow'}>
                <nav className="navbar text-center mb-3 p-2 rounded">
                    <p className="text-dark f-weight-500 f-20px m-0">Support History List   (Last One Year)</p>
                </nav>
                <DataTable
                    striped={true}
                    noHeader={true}
                    highlightOnHover={true}
                    responsive={true}
                    columns={columns}
                    data={filterText !== '' ? filteredData : data}
                    subHeader={true}
                    actions={<button className={'btn btn-primary'}>Action</button>}
                    subHeaderComponent={<FilterOption handleFilter={this.handleFilter}/>}
                    pagination={true}
                    progressPending={data.length === 0}
                    className={'ui-react-table'}
                    theme={'solarized'}
                />
            </div>
        );
    }
}

export default SupportHistoryComponent;