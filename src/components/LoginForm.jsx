import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useAuth } from './AuthContext';
import "../css/Login.css"


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
        login(user); 
        history.push('/movies');
      } else {
        console.error('Invalid Username or Password');
        setErrorMessage('Błędna nazwa użytkownika lub hasło');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Coś poszło nie tak. Spróbuj później');
    }
  };


  return (
    <Form className="container mt-3 custom-form" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Nazwa użytkownika</Form.Label>
        <Form.Control
          type="text"
          placeholder="Wpisz nazwę użytkownika"
          name="username"
          value={credentials.username}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Hasło</Form.Label>
        <Form.Control
          type="password"
          placeholder="Wpisz hasło"
          name="password"
          value={credentials.password}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit" name="submit">
      Zaloguj
      </Button>

      <span className="mt-2 d-block">Nie masz konta? <a href="/register">Zarejestruj się!</a></span>

      {errorMessage && (
        <div className="alert alert-danger mt-3">{errorMessage}</div>
      )}
    </Form>
  );
};

export default LoginForm;
