import React, {Component} from 'react';
import ReactDataTable from "../../module/data-table-react/ReactDataTable";

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
        const data = [
                {
                    id: 2,
                    title: 'Learn React',
                    year: '2007',
                    author: 'Mahabub Hossen',
                    author_id: 16103005
                },
                {
                    id: 3,
                    title: 'Happy New Year',
                    year: '2020',
                    author: 'Russell',
                    author_id: 16103056
                },
                {
                    id: 1,
                    title: 'Conan the Barbarian',
                    year: '1982',
                    author: 'Rakib Uddin',
                    author_id: 16103030
                },
            {
                id: 4,
                title: 'Conan the Barbarian',
                year: '1982',
                author: 'Rakib Uddin',
                author_id: 16103030
            },
            {
                id: 5,
                title: 'Conan the Barbarian',
                year: '1982',
                author: 'Rakib Uddin',
                author_id: 16103030
            },
            {
                id: 6,
                title: 'Conan the Barbarian',
                year: '1982',
                author: 'Rakib Uddin',
                author_id: 16103030
            },
            {
                id: 7,
                title: 'Conan the Barbarian',
                year: '1982',
                author: 'Rakib Uddin',
                author_id: 16103030
            },
            {
                id: 10,
                title: 'Conan the Barbarian',
                year: '1982',
                author: 'Rakib Uddin',
                author_id: 16103030
            },
            {
                id: 8,
                title: 'Conan the Barbarian',
                year: '1982',
                author: 'Rakib Uddin',
                author_id: 16103030
            },
            {
                id: 9,
                title: 'Conan the Barbarian',
                year: '1982',
                author: 'Rakib Uddin',
                author_id: 16103030
            },
            ];
        return (
            <div className={'bg-white p-3 rounded shadow'}>
                <nav className="navbar text-center mb-3 p-2 rounded">
                    <p className="text-dark f-weight-500 f-20px m-0" >Request History</p>
                </nav>
                <ReactDataTable
                    searchable
                    exportable
                    pagination
                    tableData={data}
                />
            </div>
        );
    }
}

export default RequestHistoryComponent;