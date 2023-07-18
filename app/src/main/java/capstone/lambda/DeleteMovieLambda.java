package capstone.lambda;

import capstone.activity.requests.DeleteMovieRequest;
import capstone.activity.results.DeleteMovieResult;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class DeleteMovieLambda  extends LambdaActivityRunner<DeleteMovieRequest, DeleteMovieResult>
            implements RequestHandler<AuthenticatedLambdaRequest<DeleteMovieRequest>, LambdaResponse> {
        private final Logger log = LogManager.getLogger();

        @Override
        public LambdaResponse handleRequest(AuthenticatedLambdaRequest<DeleteMovieRequest> input, Context context) {
            log.info("Handling request to delete Movie");
            return super.runActivity(
                    () -> input.fromPath(path -> {
                        String movieId = path.get("id");
                        return input.fromUserClaims(claims -> {
                            String customerId = claims.get("email");

                            return DeleteMovieRequest.builder()
                                    .withId(movieId)
                                    .build();
                        });
                    }),
                    (request, serviceComponent) ->
                            serviceComponent.provideDeleteMovieActivity().handleRequest(request)
            );
        }
    }

