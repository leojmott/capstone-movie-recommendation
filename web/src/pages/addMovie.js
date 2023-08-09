import MovieClient from '../api/movieClient';
import Header from '../components/header';
import BindingClass from '../util/bindingClass';
import DataStore from '../util/DataStore';

/**
 * Logic needed for the create playlist page of the website.
 */
class CreateWorkout extends BindingClass {
    constructor() {
        super();
        this.bindClassMethods(['mount', 'submit'], this);
        this.dataStore = new DataStore();
        //this.dataStore.addChangeListener(this.redirectToCreateWorkout);
        this.header = new Header(this.dataStore);
    }

    /**
     * Add the header to the page and load the MusicPlaylistClient.
     */
    mount() {
        document.getElementById('create').addEventListener('click', this.submit);

        this.header.addHeaderToPage();

        this.client = new MovieClient();
    }

    /**
     * Method to run when the create playlist submit button is pressed. Call the MusicPlaylistService to create the
     * playlist.
     */
    async submit(evt) {
        evt.preventDefault();

        const errorMessageDisplay = document.getElementById('error-message');
        const successMessageDisplay = document.getElementById('success-message');
        errorMessageDisplay.innerText = ``;
        errorMessageDisplay.classList.add('hidden');
        successMessageDisplay.innerText = ``;
        successMessageDisplay.classList.add('hidden');


        const createButton = document.getElementById('create');
        const origButtonText = createButton.innerText;
        createButton.innerText = 'Loading...';

        //Data Fields for JSON collected from form
        const title = document.getElementById('title').value;
        const genre = document.getElementById('genre').value;
        const director = document.getElementById('director').value;
        const releaseYear = document.getElementById('releaseYear').value;
        const rating = document.getElementById('rating').value;
        const trailerUrl = document.getElementById('trailerUrl').value;
        const posterImage = document.getElementById('posterImage').value;

        try {
            const movie = await this.client.addMovie(title, genre, director, releaseYear, rating, trailerUrl, posterImage);

            this.dataStore.set('movie', movie);
            successMessageDisplay.innerText = `Movie added successfully`;
            successMessageDisplay.classList.remove('hidden');
        } catch (error) {
            const errorMessage = error.response?.data?.error_message || "Undefined Error";
            errorMessageDisplay.innerText = `Error: ${errorMessage}`;
            errorMessageDisplay.classList.remove('hidden');
        } finally {
            createButton.innerText = origButtonText;
        }

        setTimeout(() => {
            document.getElementById('create').innerText = 'Add Movie';
            document.getElementById("add-movie-form").reset();
            successMessageDisplay.innerText = ``;
            successMessageDisplay.classList.add('hidden');
        }, 3000);
    }
}

/**
 * Main method to run when the page contents have loaded.
 */
const main = async () => {
    const addMovie = new addMovie();
    addMovie.mount();
};

window.addEventListener('DOMContentLoaded', main);