package capstone.converters;
import capstone.dynamodb.models.Movie;
import capstone.model.MovieModel;

import java.util.ArrayList;
import java.util.List;

/**
 * Converts between Data and API models.
 */
public class ModelConverter {

    public MovieModel toMovieModel(Movie movie) {

        MovieModel.Builder builder = MovieModel.builder()
                .withId(movie.getId())
                .withTitle(movie.getTitle())
                .withDirector(movie.getDirector())
                .withReleaseYear(movie.getReleaseYear())
                .withRating(movie.getRating())
                .withTrailerUrl(movie.getTrailerUrl())
                .withPosterImage(movie.getPosterImage())
                .withGenre(movie.getGenre());


        return builder.build();

    }
    public List<MovieModel> toMovieModels(List<Movie> movieList) {

        List<MovieModel> movieModels = new ArrayList<>();

        for(Movie movie : movieList) {
            movieModels.add(toMovieModel(movie));
        }

        return movieModels;
    }
}
