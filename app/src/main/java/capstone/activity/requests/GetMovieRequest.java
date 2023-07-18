package capstone.activity.requests;

public class GetMovieRequest {
    private final String id;

    private GetMovieRequest(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    @Override
    public String toString() {
        return "GetWorkoutRequest{" +
                "id='" + id + '\'' +
                '}';
    }

    //CHECKSTYLE:OFF:Builder
    public static Builder builder() {
        return new GetMovieRequest.Builder();
    }

    public static class Builder {
        private String id;

        public Builder withId(String id) {
            this.id = id;
            return this;
        }

        public GetMovieRequest build() {
            return new GetMovieRequest(id);
        }
    }
}
