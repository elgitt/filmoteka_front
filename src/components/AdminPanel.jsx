import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
   
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8080/admin/users');
      if (!response.ok) {
        throw new Error(`Failed to fetch users. Status: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/admin/users/${userId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Nie udało się usunąc użytkownika. Status: ${response.status}`);
      }
     fetchUsers();
     setSuccessMessage('Usunięto użytkownika.');
    } catch (error) {
      console.error('Wystąpił błąd podczas usuwania użytkownika:', error.message);
    }
  };

  return (
    <div>
      <Sidebar />
      <div style={{ marginLeft: '250px', marginTop: '50px' }}>
        {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
        <h2 style={{ color: '#fff' }}>Panel zarządzania </h2>
        <table style={{ marginTop: '50px', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ color: 'white', padding: '15px' }}>Imie</th>
              <th style={{ color: 'white', padding: '15px' }}>Nazwisko</th>
              <th style={{ color: 'white', padding: '15px' }}>Login</th>
              <th style={{ color: 'white', padding: '15px' }}>Usuń</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td style={{ color: 'white', padding: '15px' }}>{user.name}</td>
                <td style={{ color: 'white', padding: '15px' }}>{user.surname}</td>
                <td style={{ color: 'white', padding: '15px' }}>{user.username}</td>
                <td style={{ padding: '15px' }}>
                  <button onClick={() => deleteUser(user.id)}>Usuń</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;