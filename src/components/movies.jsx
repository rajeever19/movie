import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import _ from "lodash";
import Pagination from "./common/pagination";
import paginate from "../utils/paginate";
import { getGenres } from "../services/fakeGenreService";
import ListGroup from "./common/listGroup";
import MoviesTable from "./common/moviesTable";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ name: "All Movies", _id: 0 }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }
  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: movies });
  };
  handleLike = (m) => {
    console.log("like", m);
    const movies = [...this.state.movies];
    const index = movies.indexOf(m);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleGenreSelect = (genre) => {
    console.log("getGenre", genre);
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };
  handlePageChange = (p) => {
    console.log("page", p);
    this.setState({ currentPage: p });
  };
  handleSort = sortColumn => {
   
    this.setState({ sortColumn });
  };
  render() {
    const { length: count } = this.state.movies;
    const {
      currentPage,
      pageSize,
      sortColumn,
      movies: allMovies,
      selectedGenre,
    } = this.state;
    const filterMovie =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((movie) => movie.genre._id === selectedGenre._id)
        : allMovies;
    const sortedMovie = _.orderBy(
      filterMovie,
      [sortColumn.path],
      [sortColumn.order]
    );
    const movies = paginate(sortedMovie, currentPage, pageSize);
    if (count === 0) return <p>there is no movie in the database</p>;
    return (
      <div className="row p-5">
        <div className="col-4">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>Showing {filterMovie.length} movies in the database.</p>

          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
          />
          <Pagination
            itemCount={filterMovie.length}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}
export default Movies;
