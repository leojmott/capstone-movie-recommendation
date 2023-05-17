import WorkoutClient from '../api/workoutClient';
import Header from '../components/header';
import BindingClass from "../util/bindingClass";
import DataStore from "../util/DataStore";

/**
 * Logic needed for the get workout history page of the website.
 */
class GetWorkoutHistory extends BindingClass {
    constructor() {
        super();
        this.bindClassMethods(['clientLoaded', 'mount', 'getFullWorkoutHistory'], this);
        this.dataStore = new DataStore();
        this.header = new Header(this.dataStore);
    }

    /**
     * Add the header to the page and load the MusicPlaylistClient.
     */
    mount() {
        this.header.addHeaderToPage();

        this.client = new WorkoutClient();

        this.clientLoaded();
    }

    async clientLoaded() {
        const identity = await this.client.getIdentity();
        const customerId = identity.email;
        document.getElementById('workouts').innerText = "Loading Workouts ...";
        const workouts = await this.client.getFullWorkoutHistoryByCustomer(customerId)
        this.dataStore.set('workouts', workouts);
        this.addWorkoutsToPage();
    }

    async getFullWorkoutHistory(evt) {
        const identity = await this.client.getIdentity();
        this.addWorkoutsToPage();
    }

    async deleteWorkout(workoutId) {
        const confirmation = confirm('Are you sure you want to delete this workout?');
        if (!confirmation) {
            return;
        }

        try {
            await this.client.deleteWorkout(workoutId, (error) => {
                console.error('Error deleting workout:', error)
                alert('Error deleting workout');
            });
            alert('Workout deleted successfully');
            await this.clientLoaded();
        } catch (error) {
            console.error('Error deleting workout:', error)
            alert('Error deleting workout');
        }
    }


    addWorkoutsToPage() {
        const workouts = this.dataStore.get('workouts');
        if (workouts == null) {
            return;
        }

        const workoutsList = document.getElementById('workouts');
        workoutsList.innerHTML = '';

        let workoutHistoryHtml = '';

        // table header row
        workoutHistoryHtml += `<table id="workouts">
                                   <tr>
                                       <th>Date</th>
                                       <th>Workout Type</th>
                                       <th>Hours</th>
                                       <th>Minutes</th>
                                       <th>Seconds</th>
                                       <th>Distance(km)</th>
                                   </tr>
                               </table>`

        // append each workout found, row by row to existing table
        let workout;
        for (workout of workouts.workoutModels) {
            workoutHistoryHtml += `
                <table id="workouts">
                    <tr>
                        <td class="date">${workout.date}</td>
                        <td class="workoutType">${workout.workoutType}</td>
                        <td class="workoutDurationHours">${workout.durationInHours}</td>
                        <td class="workoutDurationInMinutes">${workout.durationInMinutes}</td>
                        <td class="workoutDurationInSeconds">${workout.durationInSeconds}</td>
                        <td class="distance">${workout.distance}</td>
                        <td><button class="delete-button" data-workout-id="${workout.workoutId}")">Delete</button></td>
                    </tr>
                </table>
            `;
        }
        // set page to display table built
        workoutsList.innerHTML = workoutHistoryHtml;
        // bind the click event to the delete button
        this.bindDeleteButtons();
    }

    bindDeleteButtons() {
        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => {
            button.addEventListener('click', async (event) => {
                const workoutId = event.target.getAttribute('data-workout-id');
                await this.deleteWorkout(workoutId);
            });
        });
    }
}

/**
 * Main method to run when the page contents have loaded.
 */
const main = async () => {
    const getWorkoutHistory = new GetWorkoutHistory();
    getWorkoutHistory.mount();
};

window.addEventListener('DOMContentLoaded', main);
