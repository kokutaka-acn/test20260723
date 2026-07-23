import { useEffect, useState } from 'react';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch(
          `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
        );

        if (!response.ok) {
          throw new Error('Unable to load users');
        }

        const payload = await response.json();
        setUsers(Array.isArray(payload) ? payload : payload.results || []);
      } catch (err) {
        setError(err.message || 'Unable to load users');
      }
    }

    loadUsers();
  }, []);

  return (
    <div className='container py-4'>
      <h2 className='h4 mb-3'>Users</h2>
      {error ? <div className='alert alert-danger'>{error}</div> : null}
      <ul className='list-group'>
        {users.map((user) => (
          <li key={user._id || user.email} className='list-group-item'>
            <strong>{user.name}</strong> <span className='text-muted'>({user.role})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
