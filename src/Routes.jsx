import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CustomNavbar from './components/Navbar';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import movies from './components/Movies';
import Series from './components/Series';
import { AuthProvider } from './components/AuthContext'

const Routes = () => {
  return (
    <Router>
       <AuthProvider>
      <div>
        <CustomNavbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/register" component={RegistrationForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/movies" component={movies} />
          <Route path="/series" component={Series} />
        </Switch>
      </div>
      </AuthProvider>
    </Router>
  );
};

export default Routes;
