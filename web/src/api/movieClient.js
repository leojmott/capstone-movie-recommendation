import axios from "axios";
import BindingClass from "../util/bindingClass";
import Authenticator from "./authenticator";

export default class MovieClient extends BindingClass {

    constructor(props = {}) {
        super();

        const methodsToBind = ['clientLoaded', 'getIdentity', 'login', 'logout', 'getMovie', 'addMovie', 'deleteMovie'];
        this.bindClassMethods(methodsToBind, this);

        this.authenticator = new Authenticator();
        this.props = props;

        axios.defaults.baseURL = process.env.API_BASE_URL;
        this.axiosClient = axios;
        this.clientLoaded();
    }

    /**
     * Run any functions that are supposed to be called once the client has loaded successfully.
     */
    clientLoaded() {
        if (this.props.hasOwnProperty("onReady")) {
            this.props.onReady(this);
        }
    }

    /**
     * Get the identity of the current user
     * @param errorCallback (Optional) A function to execute if the call fails.
     * @returns The user information for the current user.
     */
    async getIdentity(errorCallback) {
        try {
            const isLoggedIn = await this.authenticator.isUserLoggedIn();

            if (!isLoggedIn) {
                return undefined;
            }

            return await this.authenticator.getCurrentUserInfo();
        } catch (error) {
            this.handleError(error, errorCallback)
        }
    }

    async login() {
        this.authenticator.login();
    }

    async logout() {
        this.authenticator.logout();
    }

    async getTokenOrThrow(unauthenticatedErrorMessage) {
        const isLoggedIn = await this.authenticator.isUserLoggedIn();
        if (!isLoggedIn) {
            throw new Error(unauthenticatedErrorMessage);
        }

        return await this.authenticator.getUserToken();
    }


    async getMovie(id, errorCallback) {
        try {
            const token = await this.getTokenOrThrow("please login");
            const response = await this.axiosClient.get(`getmovies`);
            return response.data.movieModel;
        } catch (error) {
            this.handleError(error, errorCallback)
        }
    }

    async deleteMovie(id, errorCallback) {
        try {
            const token = await this.getTokenOrThrow("Must be logged in to delete a movie");
            const response = await this.axiosClient.delete(`deletemovie/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response);
            return response.data;
        } catch (error) {
            this.handleError(error, errorCallback)
        }
    }

    async addMovie(title, genre, director, releaseYear, rating, trailerUrl, posterImage) {


                const token = await this.getTokenOrThrow("Only authenticated users can add a movie.");
                console.log("token", token);
                const response = await this.axiosClient.post(`addmovie`, {
                    title: title,
                    genre: genre,
                    director: director,
                    releaseYear: releaseYear,
                    rating: rating,
                    trailerUrl: trailerUrl,
                    posterImage: posterImage
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });


      }


    async sevenDayWorkout  (customerId, numberOfDays, errorCallback) {
            try {
                    const response = await this.axiosClient.get(`workouts/customers/${customerId}/recent?numberOfDays=${numberOfDays}`);
                    console.log(response)
                    return response.data;
              } catch (error) {
                    this.handleError(error, errorCallback)
                 }
          }
      async getTypes  (customerId, numberOfDays, errorCallback) {
                 try {
                         const response = await this.axiosClient.get(`workouts/type/${customerId}/recent?numberOfDays=${numberOfDays}`);
                         console.log(response)
                         return response.data;
                   } catch (error) {
                         this.handleError(error, errorCallback)
                      }
               }
      handleError(error, errorCallback) {
                       console.error(error);

                       const errorFromApi = error?.response?.data?.error_message;
                       if (errorFromApi) {
                           console.error(errorFromApi)
                           error.message = errorFromApi;
                       }

                       if (errorCallback) {
                           errorCallback(error);
                       }
                   }
    }