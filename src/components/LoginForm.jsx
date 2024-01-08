import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useAuth } from './AuthContext';


const LoginForm = () => {

  const { login } = useAuth();

  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const history = useHistory();

  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password,
        }),
      });

      if (response.ok) {
        const user = await response.json();
        console.log('Dane użytkownika po zalogowaniu:', user);
        console.log('Imię użytkownika:', user.name);
  console.log('Nazwisko użytkownika:', user.surname);
  console.log('ID użytkownika:', user.id);
        login(user); // Zapisz użytkownika w kontekście autoryzacji
        history.push('/movies');
      } else {
        console.error('Invalid Username or Password');
        setErrorMessage('Invalid Username or Password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Something went wrong. Please try again later.');
    }
  };


  return (
    <Form className="container mt-3" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          name="username"
          value={credentials.username}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          name="password"
          value={credentials.password}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit" name="submit">
      Submit
      </Button>

      <span className="mt-2 d-block">Not registered? <a href="/register">Register here</a></span>

      {errorMessage && (
        <div className="alert alert-danger mt-3">{errorMessage}</div>
      )}
    </Form>
  );
};

export default LoginForm;
