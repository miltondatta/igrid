import React, {Component} from 'react';
import DataTable,  { createTheme } from 'react-data-table-component';

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

class RequestHistoryComponent extends Component {
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
                name: 'No',
                selector: 'id',
                sortable: true,
            },
            {
                name: 'Title',
                selector: 'title',
                sortable: true,
                right: true,
            },
            {
                name: 'Year',
                selector: 'year',
                sortable: true,
                right: true,
            },
            {
                name: 'Author',
                selector: 'author',
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
                    year: '1982',
                    author: 'Rakib Uddin',
                },
                {
                    id: 2,
                    title: 'Learn React',
                    year: '2007',
                    author: 'Mahabub Hossen',
                },
                {
                    id: 3,
                    title: 'Happy New Year',
                    year: '2020',
                    author: 'Russell',
                },
            ];
        const filteredData = data.filter((item) => item.title.includes(filterText))
        return (
            <div className={'bg-white p-3 rounded shadow'}>
                <nav className="navbar text-center mb-3 p-2 rounded">
                    <p className="text-dark f-weight-500 f-20px m-0" >Request History</p>
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

export default RequestHistoryComponent;