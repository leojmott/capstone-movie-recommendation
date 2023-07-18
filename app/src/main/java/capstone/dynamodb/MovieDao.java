package capstone.dynamodb;

import capstone.dynamodb.models.Movie;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBQueryExpression;

import javax.inject.Inject;
import javax.inject.Singleton;
import java.util.ArrayList;
import java.util.List;

@Singleton
public class MovieDao {
    private final DynamoDBMapper dynamoDbMapper;

    @Inject
    public MovieDao(DynamoDBMapper dynamoDbMapper) {
        this.dynamoDbMapper = dynamoDbMapper;
    }

    public Movie addMovie(Movie movie) {
        this.dynamoDbMapper.save(movie);
        return movie;
    }

    public List<Movie> getMovie(String id) {
        DynamoDBQueryExpression<Movie> queryExpression = new DynamoDBQueryExpression<Movie>();

        List<Movie> movieList = new ArrayList<>();
        if (id == null){
           movieList = this.dynamoDbMapper.query(Movie.class, queryExpression);
           return movieList;
        }
        movieList.add(this.dynamoDbMapper.load(Movie.class, id));
        return movieList;
    }
    public void deleteMovie(Movie m) {
        dynamoDbMapper.delete(m);
    }
}

//key value pairs () ...yagni