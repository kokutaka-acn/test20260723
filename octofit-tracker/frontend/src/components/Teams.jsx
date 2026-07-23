import { useEffect, useState } from 'react';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch(
          `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
        );

        if (!response.ok) {
          throw new Error('Unable to load teams');
        }

        const payload = await response.json();
        setTeams(Array.isArray(payload) ? payload : payload.results || []);
      } catch (err) {
        setError(err.message || 'Unable to load teams');
      }
    }

    loadTeams();
  }, []);

  return (
    <div className='container py-4'>
      <h2 className='h4 mb-3'>Teams</h2>
      {error ? <div className='alert alert-danger'>{error}</div> : null}
      <div className='row g-3'>
        {teams.map((team) => (
          <div key={team._id || team.name} className='col-md-6'>
            <div className='card h-100'>
              <div className='card-body'>
                <h3 className='h6'>{team.name}</h3>
                <p className='text-muted mb-0'>{team.sport || 'fitness'}</p>
                <p className='mb-0'>{(team.members || []).join(', ')}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
