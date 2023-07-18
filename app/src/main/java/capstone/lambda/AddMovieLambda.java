package capstone.lambda;

import capstone.activity.requests.AddMovieRequest;
import capstone.activity.results.AddMovieResult;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

public class AddMovieLambda
            extends LambdaActivityRunner<AddMovieRequest, AddMovieResult>
            implements RequestHandler<AuthenticatedLambdaRequest<AddMovieRequest>, LambdaResponse> {
        @Override
        public LambdaResponse handleRequest(AuthenticatedLambdaRequest<AddMovieRequest> input, Context context) {
            return super.runActivity(
                    () -> {
                        AddMovieRequest unauthenticatedRequest = input.fromBody(AddMovieRequest.class);
                        return input.fromUserClaims(claims ->
                                AddMovieRequest.builder()
                                        .withId(unauthenticatedRequest.getId())
                                        .withTitle(unauthenticatedRequest.getTitle())
                                        .withDirector(unauthenticatedRequest.getDirector())
                                        .withReleaseYear(unauthenticatedRequest.getReleaseYear())
                                        .withRating(unauthenticatedRequest.getRating())
                                        .withTrailerUrl(unauthenticatedRequest.getTrailerUrl())
                                        .withPosterImage(unauthenticatedRequest.getPosterImage())
                                        .withGenre(unauthenticatedRequest.getGenre())
                                        .build());
                    },
                    (request, serviceComponent) ->
                            serviceComponent.provideAddMovieActivity().handleRequest(request)
            );
        }
    }


