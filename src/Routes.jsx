import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import Movies from './components/Movies';
import MovieDetails from './components/MovieDetails';
import UserRatings from './components/UserRatings'; 
import UserWatchlist from './components/UserWatchlist';
import { AuthProvider } from './components/AuthContext';
import ProfilePage from './components/ProfilePage';
import Recommended from "./components/Recommended";
import AdminPanel from './components/AdminPanel';

const Routes = () => {
  return (
    <Router>
       <AuthProvider>
      <div>
        {/* <CustomNavbar /> */}
        <Switch>
          <Route path="/home" exact component={Home} />
          <Route path="/" exact component={Home} />
          <Route path="/register" component={RegistrationForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/movies" exact component={Movies} />
          <Route path="/movies/:id" component={MovieDetails} />
          <Route path="/ratings" component={UserRatings} /> 
          <Route path="/watchlist" component={UserWatchlist} /> 
          <Route path="/profile" component={ProfilePage} />
          <Route path="/recommended" component={Recommended} />
          <Route path="/admin" component={AdminPanel} />

      
        </Switch>
      </div>
      </AuthProvider>
    </Router>
  );
};

export default Routes;
