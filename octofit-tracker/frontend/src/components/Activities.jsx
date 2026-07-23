import { useEffect, useState } from 'react';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await fetch(
          `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
        );

        if (!response.ok) {
          throw new Error('Unable to load activities');
        }

        const payload = await response.json();
        setActivities(Array.isArray(payload) ? payload : payload.results || []);
      } catch (err) {
        setError(err.message || 'Unable to load activities');
      }
    }

    loadActivities();
  }, []);

  return (
    <div className='container py-4'>
      <h2 className='h4 mb-3'>Activities</h2>
      {error ? <div className='alert alert-danger'>{error}</div> : null}
      <ul className='list-group'>
        {activities.map((activity) => (
          <li key={activity._id || `${activity.type}-${activity.date}`} className='list-group-item'>
            <strong>{activity.type}</strong> — {activity.duration} min on {activity.date}
          </li>
        ))}
      </ul>
    </div>
  );
}
