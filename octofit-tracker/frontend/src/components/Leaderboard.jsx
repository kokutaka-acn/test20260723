import { useEffect, useState } from 'react';

function buildApiUrl(path) {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev${path}`;
  }

  return `http://localhost:8000${path}`;
}

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const response = await fetch(buildApiUrl('/api/leaderboard/'));
        if (!response.ok) {
          throw new Error('Unable to load leaderboard');
        }

        const payload = await response.json();
        setEntries(Array.isArray(payload) ? payload : payload.results || []);
      } catch (err) {
        setError(err.message || 'Unable to load leaderboard');
      }
    }

    loadLeaderboard();
  }, []);

  return (
    <div className='container py-4'>
      <h2 className='h4 mb-3'>Leaderboard</h2>
      {error ? <div className='alert alert-danger'>{error}</div> : null}
      <ol className='list-group list-group-numbered'>
        {entries.map((entry) => (
          <li key={entry._id || entry.name} className='list-group-item d-flex justify-content-between align-items-start'>
            <span>{entry.name}</span>
            <span className='badge bg-primary rounded-pill'>{entry.points} pts</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
