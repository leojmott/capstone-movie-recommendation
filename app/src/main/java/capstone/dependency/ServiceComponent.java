package capstone.dependency;

import capstone.activity.AddMovieActivity;
import capstone.activity.DeleteMovieActivity;
import capstone.activity.GetMovieActivity;
import dagger.Component;

import javax.inject.Singleton;

@Singleton
@Component(modules = {DaoModule.class, MetricsModule.class})
public interface ServiceComponent {

    /**
     * Provides the relevant activity.
     *
     * @return AddMovieActivity
     */
    AddMovieActivity provideAddMovieActivity();
    DeleteMovieActivity provideDeleteMovieActivity();
    GetMovieActivity provideGetMovieActivity();
}