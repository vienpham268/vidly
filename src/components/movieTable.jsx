import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import Table from './commons/table'
import Like from './commons/like'
class MoviesTable extends Component {
    columns = [
    { path: 'title', label: 'Title', content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link> },
        { path: 'genre.name', label: 'Genre' },
        { path: 'numberInStock', label: 'Stock' },
        { path: 'dailyRentalRate', label: 'Rate' },
        {
            key: 'like',
            content: movie => <Like onLikeToggle={() => this.props.onLike(movie)} liked={movie.liked} />
        },
        {
            key: 'delete',
            content: movie => <button onClick={() => this.props.onDelete(movie._id)} className="btn btn-danger btn-sm">Delete</button>
        },
    ]
    render() {
        const { movies, onSort, sortColumn } = this.props
        return (
            <Table
                columns={this.columns}
                onSort={onSort}
                sortColumn={sortColumn}
                data={movies} />
        )
    }
}


export default MoviesTable;