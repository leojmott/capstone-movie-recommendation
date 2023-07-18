package capstone.activity;

import capstone.activity.requests.AddMovieRequest;
import capstone.activity.results.AddMovieResult;
import capstone.converters.ModelConverter;
import capstone.dynamodb.MovieDao;
import capstone.dynamodb.models.Movie;
import capstone.model.MovieModel;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import utils.IdGenerator;

import javax.inject.Inject;
import java.util.LinkedList;
import java.util.List;

public class AddMovieActivity {
        private final Logger log = LogManager.getLogger();
        private final MovieDao movieDao;


        /**
         * Instantiates a new AddMovieActivity object.
         *
         * @param movieDao MovieDao to access the movies table.
         */
        @Inject
        public AddMovieActivity(MovieDao movieDao) {
            this.movieDao = movieDao;

        }

        /**
         * This method handles the incoming request by adding an additional movie
         * <p>
         * It then returns the updated movie list.
         * <p>
         * If the playlist does not exist, this should throw a PlaylistNotFoundException.
         * <p>
         * If the album track does not exist, this should throw an AlbumTrackNotFoundException.
         *
         * @param addSongToPlaylistRequest request object containing the playlist ID and an asin and track number
         *                                 to retrieve the song data
         * @return addSongToPlaylistResult result object containing the playlist's updated list of
         *                                 API defined {@link SongModel}s
         */
        public AddMovieResult handleRequest(final AddMovieRequest addMovieRequest) {
            log.info("Received AddMovieRequest {} ", addMovieRequest);

            String id = addMovieRequest.getId();
            // Allow NPE when unboxing Integer if track number is null (getTrackNumber returns Integer)


            Movie newMovie = new Movie();
            newMovie.setId(IdGenerator.generatePlaylistId());
            newMovie.setTitle(addMovieRequest.getTitle());
            newMovie.setGenre(addMovieRequest.getGenre());
            newMovie.setDirector(addMovieRequest.getDirector());
            newMovie.setReleaseYear(addMovieRequest.getReleaseYear());
            newMovie.setRating(addMovieRequest.getRating());
            newMovie.setTrailerUrl(addMovieRequest.getTrailerUrl());
            newMovie.setPosterImage(addMovieRequest.getPosterImage());


            // exception/error handling to be added to make sure this parses properly


            movieDao.addMovie(newMovie);

            MovieModel movieModel = new ModelConverter().toMovieModel(newMovie);
            return AddMovieResult.builder()
                    .withMovie(movieModel)
                    .build();
        }
}