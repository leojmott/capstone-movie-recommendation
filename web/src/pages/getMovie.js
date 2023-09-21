import MovieClient from '../api/movieClient';
import Header from '../components/header';
import BindingClass from "../util/bindingClass";
import DataStore from "../util/DataStore";

/**
 * Logic needed for the get workout history page of the website.
 */
class GetMovie extends BindingClass {
    constructor() {
        super();
        this.bindClassMethods(['clientLoaded', 'mount', 'getMovie', 'addMovieToPage'], this);
        this.dataStore = new DataStore();
        this.dataStore.addChangeListener(this.addMovieToPage);
        this.header = new Header(this.dataStore);
    }

    /**
     * Add the header to the page and load the MusicPlaylistClient.
     */
    mount() {
        this.header.addHeaderToPage();

        this.client = new MovieClient();

        this.clientLoaded();
    }

    async clientLoaded() {
        const identity = await this.client.getIdentity();
        const customerId = identity.email;
        document.getElementById('movies').innerText = "Loading ...";
        const movie = await this.client.getMovie(customerId, console.log)
        this.dataStore.set('movies', movie);
    }

    async getMovie(evt) {
        const identity = await this.client.getIdentity();
        this.addMovieToPage();
    }

    async deleteMovie(id) {
        const confirmation = confirm('Are you sure you want to delete this movie?');
        if (!confirmation) {
            return;
        }

        try {
            await this.client.deleteMovie(id, (error) => {
                console.error('Error deleting movie:', error)
                alert('Error deleting movie');
            });
            alert('Movie deleted successfully');
            await this.clientLoaded();
        } catch (error) {
            console.error('Error deleting movie:', error)
            alert('Error deleting movie');
        }
    }


    addMovieToPage() {
        const movies = this.dataStore.get('movies');
        if (movies == null) {
            return;
        }

        const movieList = document.getElementById('movies');
        movieList.innerHTML = '';

        let moviesHtml = '';

        // table header row
        moviesHtml += `<table id="movies">
                                   <tr>
                                       <th>Title</th>
                                       <th>Genre</th>
                                       <th>Director</th>
                                       <th>Release Year</th>
                                       <th>Rating</th>
                                       <th>Trailer Url</th>
                                       <th>Poster Image</th>

                                   </tr>
                               </table>`

        // append each workout found, row by row to existing table

        for (let movie of movies) {
            moviesHtml += `
                <table id="movies">
                    <tr>
                        <td class="title">${movie.title}</td>
                        <td class="genre">${movie.genre}</td>
                        <td class="director">${movie.director}</td>
                        <td class="releaseYear">${movie.releaseYear}</td>
                        <td class="rating">${movie.rating}</td>
                        <td class="trailerUrl">${movie.trailerUrl}</td>
                        <td class="posterImage">${movie.posterImage}</td>
                        <td><button class="delete-button" data-movie-id="${movie.id}")">Delete</button></td>
                    </tr>
                </table>
            `;
        }
        // set page to display table built
        movieList.innerHTML = moviesHtml;
        // bind the click event to the delete button
        this.bindDeleteButtons();
    }

    bindDeleteButtons() {
        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => {
            button.addEventListener('click', async (event) => {
                const id = event.target.getAttribute('data-movie-id');
                await this.deleteMovie(id);
            });
        });
    }
}

/**
 * Main method to run when the page contents have loaded.
 */
const main = async () => {
    const getMovie = new GetMovie();
    getMovie.mount();
};

window.addEventListener('DOMContentLoaded', main);
