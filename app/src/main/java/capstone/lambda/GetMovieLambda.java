package capstone.lambda;

import capstone.activity.requests.GetMovieRequest;
import capstone.activity.results.GetMovieResult;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class GetMovieLambda
            extends LambdaActivityRunner<GetMovieRequest, GetMovieResult>
            implements RequestHandler<LambdaRequest<GetMovieRequest>, LambdaResponse> {

        private final Logger log = LogManager.getLogger();

        @Override
        public LambdaResponse handleRequest(LambdaRequest<GetMovieRequest> input, Context context) {
            return super.runActivity(
                    () -> input.fromPathAndQuery((path, query)->
                            GetMovieRequest.builder()
                                    .withId(path.get("customerId"))
                                    .build()),

                    (request, serviceComponent) ->
                            serviceComponent.provideGetMovieActivity().handleRequest(request)
            );
        }
    }
