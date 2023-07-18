package capstone.activity.results;

import capstone.dynamodb.models.Movie;
import capstone.model.MovieModel;

import java.util.ArrayList;
import java.util.List;

public class AddMovieResult {
        private final MovieModel movie;

        private AddMovieResult(MovieModel movie) {
            this.movie = movie;
        }

        public MovieModel getMovieModel() {
            return movie;
        }

        @Override
        public String toString() {
            return "AddMovieResult{" +
                    "movie=" + movie +
                    '}';
        }

        //CHECKSTYLE:OFF:Builder
        public static Builder builder() {
            return new Builder();
        }

        public static class Builder {
            private MovieModel movie;

            public Builder withMovie(MovieModel movie) {
                this.movie = movie;
                return this;
            }

            public AddMovieResult build() {
                return new AddMovieResult(movie);
            }
        }
    }

