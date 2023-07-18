package capstone.activity;

import capstone.activity.requests.DeleteMovieRequest;
import capstone.activity.results.DeleteMovieResult;
import capstone.dynamodb.MovieDao;
import capstone.dynamodb.models.Movie;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import javax.inject.Inject;
import java.util.List;

public class DeleteMovieActivity {
    private final Logger log = LogManager.getLogger();
    private final MovieDao movieDao;

    @Inject
    public DeleteMovieActivity(MovieDao movieDao) {
        this.movieDao = movieDao;
    }

    public DeleteMovieResult handleRequest(final DeleteMovieRequest deleteMovieRequest) {
        log.info("Received DeleteMovieRequest {}", deleteMovieRequest);
        String id = deleteMovieRequest.getId();
        List<Movie> movie = movieDao.getMovie(id);
        Movie m = movie.get(0);

       // try {
            movieDao.deleteMovie(m);
//        } catch (DeleteMovieException e) {
//            log.error("Error deleting movie: {}", e.getMessage());
//            System.out.println(e.getMessage());
//        }

        return DeleteMovieResult.builder()
                .withMovieId(deleteMovieRequest.getId())
                .build();
    }

}
