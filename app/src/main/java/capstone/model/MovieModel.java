package capstone.model;

import capstone.dynamodb.models.Movie;

public class MovieModel {
        private final String id;
        private final String title;
        private final String genre;
        private final String director;
        private final String releaseYear;
        private final double rating;
        // private List<String> cast;
        private final String trailerUrl;
        private final String posterImage;

        private MovieModel(String id, String title, String genre, String director, String releaseYear,
                             double rating, String trailerUrl, String posterImage) {
            this.id = id;
            this.title = title;
            this.director = director;
            this.releaseYear = releaseYear;
            this.rating = rating;
            this.trailerUrl = trailerUrl;
            this.posterImage = posterImage;
            this.genre = genre;
        }

        public String getId() {
            return id;
        }

        public String getTitle() {
            return title;
        }

        public String getDirector() {
            return director;
        }

        public String getReleaseYear() {
            return releaseYear;
        }

        public double getRating() {
            return rating;
        }

        public String getTrailerUrl() {
            return trailerUrl;
        }

        public String getPosterImage() {
            return posterImage;
        }

        public String getGenre() {
            return genre;
        }


        //CHECKSTYLE:OFF:Builder
        public static Builder builder() {
            return new MovieModel.Builder();
        }

        public static class Builder {
            private String id;
            private String title;
            private String director;
            private String releaseYear;
            private double rating;
            private String trailerUrl;
            private String posterImage;
            private String genre;


            public Builder withId(String id) {
                this.id = id;
                return this;
            }

            public Builder withTitle(String title) {
                this.title = title;
                return this;
            }

            public Builder withDirector(String director) {
                this.director = director;
                return this;
            }

            public Builder withReleaseYear(String releaseYear) {
                this.releaseYear = releaseYear;
                return this;
            }

            public Builder withRating(double rating) {
                this.rating = rating;
                return this;
            }

            public Builder withTrailerUrl(String trailerUrl) {
                this.trailerUrl = trailerUrl;
                return this;
            }

            public Builder withPosterImage(String posterImage) {
                this.posterImage = posterImage;
                return this;
            }

            public Builder withGenre(String genre) {
                this.genre = genre;
                return this;
            }


            public MovieModel build() {
                return new MovieModel(id, title, genre, director, releaseYear, rating, trailerUrl,
                        posterImage);
            }

        }
    }
