package capstone.activity.requests;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;

    @JsonDeserialize(builder = DeleteMovieRequest.Builder.class)
    public class DeleteMovieRequest {
        private final String id;

        private DeleteMovieRequest(String id) {
            this.id = id;
        }

        public String getId() {
            return id;
        }


        public static Builder builder() {
            return new Builder();
        }

        @JsonPOJOBuilder
        public static class Builder {
            private String id;

            public Builder withId(String id) {
                this.id = id;
                return this;
            }

            public DeleteMovieRequest build() {
                return new DeleteMovieRequest(id);
            }
        }
    }