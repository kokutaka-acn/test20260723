import { useEffect, useState } from 'react';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(
          `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
        );

        if (!response.ok) {
          throw new Error('Unable to load workouts');
        }

        const payload = await response.json();
        setWorkouts(Array.isArray(payload) ? payload : payload.results || []);
      } catch (err) {
        setError(err.message || 'Unable to load workouts');
      }
    }

    loadWorkouts();
  }, []);

  return (
    <div className='container py-4'>
      <h2 className='h4 mb-3'>Workouts</h2>
      {error ? <div className='alert alert-danger'>{error}</div> : null}
      <div className='row g-3'>
        {workouts.map((workout) => (
          <div key={workout._id || workout.title} className='col-md-6'>
            <div className='card h-100'>
              <div className='card-body'>
                <h3 className='h6'>{workout.title}</h3>
                <p className='mb-1'><strong>Focus:</strong> {workout.focus}</p>
                <p className='mb-0'><strong>Duration:</strong> {workout.duration} min</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
