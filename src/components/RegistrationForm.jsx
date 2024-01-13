import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';


const RegistrationForm = () => {
  const [user, setUser] = useState({
    name: '',
    surname: '',
    username: '',
    password: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    console.log('Sending data:', user);
      const response = await fetch('http://localhost:8080/register/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify(user),
      });

      if (response.ok) {
        setSuccessMessage('You have successfully registered!');
        setErrorMessage('');
      } else {
        setSuccessMessage('');
        setErrorMessage('Registration failed. Please check your details and try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setSuccessMessage('');
      setErrorMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <Form className="container mt-3 custom-form" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Imię</Form.Label>
        <Form.Control
          type="text"
          placeholder="Wpisz imię"
          name="name"
          value={user.name}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="surname">
        <Form.Label>Nazwisko</Form.Label>
        <Form.Control
          type="text"
          placeholder="Wpisz nazwisko"
          name="surname"
          value={user.surname}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Nazwa użytkownika</Form.Label>
        <Form.Control
          type="text"
          placeholder="Wpisz nazwę użytkownika"
          name="username"
          value={user.username}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Hasło</Form.Label>
        <Form.Control
          type="password"
          placeholder="Wpisz hasło"
          name="password"
          value={user.password}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Zarejestruj
      </Button>

      <span className="mt-2 d-block">Masz już konto? <a href="/login">Zaloguj się!</a></span>

      {successMessage && (
        <div className="alert alert-success mt-3">{successMessage}</div>
      )}

      {errorMessage && (
        <div className="alert alert-danger mt-3">{errorMessage}</div>
      )}
    </Form>
  );
};

export default RegistrationForm;
