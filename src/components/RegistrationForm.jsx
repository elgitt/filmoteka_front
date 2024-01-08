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
    <Form className="container mt-3" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter first name"
          name="name"
          value={user.name}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="surname">
        <Form.Label>Surname</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter surname"
          name="surname"
          value={user.surname}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          name="username"
          value={user.username}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          name="password"
          value={user.password}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Register
      </Button>

      <span className="mt-2 d-block">Already registered? <a href="/login">Login here</a></span>

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
