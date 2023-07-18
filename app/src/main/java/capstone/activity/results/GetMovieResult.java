package capstone.activity.results;

import capstone.model.MovieModel;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class GetMovieResult {
        private final List <MovieModel> movieModel;
        private final String errorMessage;



        private GetMovieResult(List <MovieModel> movieModels, String errorMessage) {
            this.movieModel = movieModels;
            this.errorMessage = errorMessage;
        }


        public List <MovieModel> getMovieModel() {
            return movieModel == null ? Collections.emptyList() : new ArrayList<>(movieModel);
        }

        public String getErrorMessage() {
            return errorMessage;
        }

        @Override
        public String toString() {
            return "GetMovieResult{" +
                    "movieModel=" + movieModel +
                    '}';
        }

        //CHECKSTYLE:OFF:Builder
        public static Builder builder() {
            return new Builder();
        }

        public static class Builder {
            private List <MovieModel> movieModel;
            private String errorMessage;

            public Builder withMovieList(List <MovieModel> movieModel) {
                this.movieModel = new ArrayList<>(movieModel);
                return this;
            }

            public Builder withErrorMessage(String errorMessage) {
                this.errorMessage = errorMessage;
                return this;
            }

            public GetMovieResult build() {
                return new GetMovieResult(movieModel, errorMessage);
            }
        }
    }

