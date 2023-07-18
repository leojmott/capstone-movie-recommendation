package capstone.activity;

import capstone.activity.requests.GetMovieRequest;
import capstone.activity.results.GetMovieResult;
import capstone.converters.ModelConverter;
import capstone.dynamodb.MovieDao;
import capstone.dynamodb.models.Movie;
import capstone.model.MovieModel;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import utils.CollectionUtils;

import javax.inject.Inject;
import java.util.Comparator;
import java.util.List;

import static utils.CollectionUtils.copyToList;

public class GetMovieActivity {
    private final Logger log = LogManager.getLogger();
    private final MovieDao movieDao;

    @Inject
    public GetMovieActivity(MovieDao movieDao) {
        this.movieDao = movieDao;
    }

    public GetMovieResult handleRequest(final GetMovieRequest getMovieRequest) {
        log.info("Received GetMovieRequest {}", getMovieRequest);

//            return GetMovieResult.builder()
//                    .withErrorMessage("Invalid input for numberOfDays: " + getWorkoutRequest.getNumberOfDays())
//                    .build();
//        }

        List<Movie> movies = movieDao.getMovie(getMovieRequest.getId());
        List<Movie> movieCopy = CollectionUtils.copyToList(movies);


        List<MovieModel> movieModels = new ModelConverter().toMovieModels(movieCopy);
        log.info("movieModels converted");
        return GetMovieResult.builder()
                .withMovieList(movieModels)
                .build();
    }
}
