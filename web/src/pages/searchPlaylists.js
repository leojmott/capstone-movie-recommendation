import WorkoutClient from '../api/workoutClient';
import Header from '../components/header';
import BindingClass from "../util/bindingClass";
import DataStore from "../util/DataStore";
import Chart from 'chart.js/auto';
import Authenticator from "../api/authenticator";

/**
 * Logic needed for the get workout history page of the website.
 */
class GetWorkoutHub extends BindingClass {
    constructor() {
        super();
        this.bindClassMethods(['clientLoaded', 'mount', 'get7dayWorkout', 'workoutTypeChart'], this);
        this.dataStore = new DataStore();
        this.header = new Header(this.dataStore);
        this.authenticator = new Authenticator();
        console.log("getWorkoutHub constructor");
    }

    /**
     * Add the header to the page and load the MusicPlaylistClient.
     */
    mount() {
        this.header.addHeaderToPage();

        this.client = new WorkoutClient();

        this.clientLoaded();

    }
    async workoutTypeChart() {
        const identity = await this.client.getIdentity();
        const result = await this.client.getTypes(identity.email,"7");
        console.log(result, " types result: ");
        const data = {
            labels: [
            'Swimming',
            'Running',
            'Biking'
            ],
            datasets: [{
            label: 'Workout Type Ratio',
            data: [result.swimCount, result.runCount, result.bikeCount],
            backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
            }]
        };



    // Doughnut Chart Configuration
    const config = {
      type: 'doughnut',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          },
          title: {
            display: true,
            text: 'Workout by Types'
          }
        }
      }
    };

    // Initialize Chart
    const myChart = new Chart(
      document.getElementById('typesChart'),
      config
    );
    }
    async clientLoaded() {
        const identity = await this.client.getIdentity();
        const customerId = identity.email;
        document.getElementById('workouts').innerText = "Loading Workouts ...";
        const workouts = await this.client.sevenDayWorkout(customerId,"7")
        this.dataStore.set('workouts', workouts);
        this.addWorkoutsToPage();
        this.workoutTypeChart();

    }

    async get7dayWorkout(evt) {
        const identity = await this.client.getIdentity();
        this.addWorkoutsToPage();
    }

     addWorkoutsToPage() {
        const workouts = this.dataStore.get('workouts');
        if (workouts == null) {
            return;
        }

        const workoutsList = document.getElementById('workouts');
        workoutsList.innerHTML = '';

        let workoutHubHtml = '';

        workoutHubHtml += `<table id="workouts">
                                   <tr>
                                       <th>Date</th>
                                       <th>Workout Type</th>
                                       <th>Hours</th>
                                       <th>Minutes</th>
                                       <th>Seconds</th>
                                       <th>Distance(km)</th>
                                   </tr>
                               </table>`
        let workout;
        for (workout of workouts.workoutModels) {
            console.log(workout.date);
            workoutHubHtml += `
               <table id="workouts">
                   <tr>
                       <td class="date">${workout.date}</td>
                       <td class="workoutType">${workout.workoutType}</td>
                       <td class="workoutDurationInHours">${workout.durationInHours}</td>
                       <td class="workoutDurationInMinutes">${workout.durationInMinutes}</td>
                       <td class="workoutDurationInSeconds">${workout.durationInSeconds}</td>
                       <td class="distance">${workout.distance}</td>
                   </tr>
               </table>
            `;
        }
        workoutsList.innerHTML = workoutHubHtml;

    }
}

/**
 * Main method to run when the page contents have loaded.
 */
const main = async () => {
    const getWorkoutHub = new GetWorkoutHub();
    getWorkoutHub.mount();
};

window.addEventListener('DOMContentLoaded', main);
