package capstone.activity.results;

public class DeleteMovieResult {

    private final String id;

    private DeleteMovieResult(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }


    //CHECKSTYLE:OFF:Builder
    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private String id;

        public Builder withMovieId(String id) {
            this.id = id;
            return this;
        }


        public DeleteMovieResult build() {
            return new DeleteMovieResult(id);
        }
    }

    @Override
    public String toString() {
        return "DeleteWorkoutResult{" +
                "movieId='" + id + '\'' +
                '}';
    }
}

