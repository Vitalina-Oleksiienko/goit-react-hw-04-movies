import "./App.css";
import { Route, Switch, Redirect } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import Navigation from './components/navigation/Navigation';

const Home = lazy(() => import('./pages/home/Home'));
const Movies = lazy(() => import('./pages/movies/Movies.js'));
const MovieDetails = lazy(() =>
  import('./pages/movieDetails/MovieDetails.js'),
);


export default function App() {

  return (
    <>
      <header className='header'>
        <Navigation />
      </header>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Home} />

          <Route exact path="/movies" component={Movies} />

          <Route path="/movies/:movieId">
            <MovieDetails />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </>
    );
}
