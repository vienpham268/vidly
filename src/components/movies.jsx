import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService'
import { getGenres } from '../services/fakeGenreService'
import Pagination from './commons/pagination'
import ListGroup from './commons/listGroup'
import paginate from '../utils/paginate'
import MoviesTable from './movieTable'
import _ from 'lodash'
class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        selectedGenre: "",
        currentPage: 1,
        pageSize: 4,
        sortColumn: { path: 'title', order: 'asc' }
    }

    componentDidMount() {
        const genres = [{ _id: "", name: 'All Genres' }, ...getGenres()]
        this.setState({ movies: getMovies(), genres })
    }

    handleDelete = (movieID) => {
        const movies = this.state.movies.filter(f => f._id !== movieID)
        this.setState({ movies })
    }

    handleLike = (movie) => {
        const movies = [...this.state.movies]
        const index = movies.indexOf(movie)
        movies[index] = { ...movies[index] }
        movies[index].liked = !movies[index].liked
        this.setState({ movies })
    }

    handlePageChange = (page) => {
        this.setState({ currentPage: page })
    }

    handleGenreSelect = (genre) => {
        this.setState({ selectedGenre: genre, currentPage: 1 })
    }

    handleSort = sortColumn => {
        this.setState({ sortColumn })
    }

    getPageData = () => {
        const { movies: allMovies, pageSize, currentPage, selectedGenre, sortColumn } = this.state
        const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(m =>
            m.genre._id === selectedGenre._id
        ) : allMovies
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])
        const movies = paginate(sorted, currentPage, pageSize)
        return { totalCount: filtered.length, data: movies }
    }

    render() {
        const { length: count } = this.state.movies
        const { pageSize, currentPage, sortColumn } = this.state
        if (count === 0) {
            return <p>There are no movies on database</p>
        }

        const { totalCount, data:movies } = this.getPageData()

        return (
            <div className='row'>
                <div className="col-3">
                    <ListGroup
                        items={this.state.genres}
                        selectedItem={this.state.selectedGenre}
                        onItemSelect={this.handleGenreSelect} />
                </div>
                <div className="col">
                    <p>Showing {totalCount} movies on database</p>
                    <MoviesTable
                        movies={movies}
                        sortColumn={sortColumn}
                        onDelete={this.handleDelete}
                        onLike={this.handleLike}
                        onSort={this.handleSort}
                    />
                    <Pagination
                        itemsCount={totalCount}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange} />


                </div>
            </div>
        );
    }
}

export default Movies;