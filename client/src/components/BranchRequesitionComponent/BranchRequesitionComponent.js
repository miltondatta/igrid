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

class BranchRequesitionComponent extends Component {

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
                name: 'Sl',
                selector: 'id',
                sortable: true,
            },
            {
                name: 'Branch Name',
                selector: 'title',
                sortable: true,
                right: true,
            },
            {
                name: 'Branch ID.',
                selector: 'branch_id',
                sortable: true,
                right: true,
            },
            {
                name: 'Wireless Router',
                selector: 'wirelessRouter',
                sortable: true,
                right: true,
            },
            {
                name: 'Action',
                cell: () => <button className={'ui-btn'} onClick={(e) => {console.log(e.target.name, e.target.value)}}>Approve</button>,
                ignoreRowClick: true,
                allowOverflow: true,
                button: true,
            },
        ];
        const data = [
            {
                id: 1,
                title: 'Conan the Barbarian',
                branch_id: '1982',
                wirelessRouter: '10',
            },
            {
                id: 2,
                title: 'Learn React',
                branch_id: '2007',
                wirelessRouter: '15',
            },
            {
                id: 3,
                title: 'Happy New Year',
                branch_id: '2020',
                wirelessRouter: '5',
            },
        ];
        const filteredData = data.filter((item) => item.title.includes(filterText))
        return (
            <div className={'bg-white p-3 rounded shadow'}>
                <nav className="navbar text-center mb-3 p-2 rounded">
                    <p className="text-dark f-weight-500 f-20px m-0">Branch Requisition</p>
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

export default BranchRequesitionComponent;