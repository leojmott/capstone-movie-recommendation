import WorkoutClient from '../api/workoutClient';
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

        this.client = new WorkoutClient();
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
        const workoutType = document.getElementById('workoutType').value;
        const date = document.getElementById('date').value;
        const durationInHours = document.getElementById('hours').value;
        const durationInMinutes = document.getElementById('minutes').value;
        const durationInSeconds = document.getElementById('seconds').value;
        const distance = document.getElementById('distance').value;

        try {
            const workout = await this.client.createWorkout(workoutType, date, durationInHours, durationInMinutes, durationInSeconds, distance);

            this.dataStore.set('workout', workout);
            successMessageDisplay.innerText = `Workout added successfully`;
            successMessageDisplay.classList.remove('hidden');
        } catch (error) {
            const errorMessage = error.response?.data?.error_message || "Undefined Error";
            errorMessageDisplay.innerText = `Error: ${errorMessage}`;
            errorMessageDisplay.classList.remove('hidden');
        } finally {
            createButton.innerText = origButtonText;
        }

        setTimeout(() => {
            document.getElementById('create').innerText = 'Record Workout';
            document.getElementById("create-workout-form").reset();
            successMessageDisplay.innerText = ``;
            successMessageDisplay.classList.add('hidden');
        }, 3000);
    }
}

/**
 * Main method to run when the page contents have loaded.
 */
const main = async () => {
    const createWorkout = new CreateWorkout();
    createWorkout.mount();
};

window.addEventListener('DOMContentLoaded', main);
