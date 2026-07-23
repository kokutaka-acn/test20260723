import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function Home() {
  return (
    <div className='container py-5'>
      <h1 className='display-5'>OctoFit Tracker</h1>
      <p className='lead'>A modern multi-tier fitness tracking experience.</p>
      <p className='text-muted'>Define VITE_CODESPACE_NAME in .env.local to target the Codespaces API URL. If it is not set, the app falls back to http://localhost:8000.</p>
      <div className='d-flex flex-wrap gap-2'>
        <NavLink className='btn btn-primary' to='/users'>View users</NavLink>
        <NavLink className='btn btn-outline-secondary' to='/activities'>View activities</NavLink>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <div className='container'>
          <NavLink className='navbar-brand' to='/'>OctoFit</NavLink>
          <div className='navbar-nav ms-auto'>
            <NavLink className='nav-link' to='/users'>Users</NavLink>
            <NavLink className='nav-link' to='/teams'>Teams</NavLink>
            <NavLink className='nav-link' to='/activities'>Activities</NavLink>
            <NavLink className='nav-link' to='/leaderboard'>Leaderboard</NavLink>
            <NavLink className='nav-link' to='/workouts'>Workouts</NavLink>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/users' element={<Users />} />
        <Route path='/teams' element={<Teams />} />
        <Route path='/activities' element={<Activities />} />
        <Route path='/leaderboard' element={<Leaderboard />} />
        <Route path='/workouts' element={<Workouts />} />
      </Routes>
    </div>
  );
}
