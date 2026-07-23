import { Routes, Route, Link } from 'react-router-dom';

function Home() {
  return <div className='container py-5'><h1 className='display-5'>OctoFit Tracker</h1><p className='lead'>Modern multi-tier fitness tracking app.</p><Link className='btn btn-primary' to='/about'>Learn more</Link></div>;
}

function About() {
  return <div className='container py-5'><h2>About OctoFit</h2><p>This React app is ready for the OctoFit Tracker experience.</p><Link className='btn btn-outline-secondary' to='/'>Back home</Link></div>;
}

export default function App() {
  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <div className='container'>
          <Link className='navbar-brand' to='/'>OctoFit</Link>
        </div>
      </nav>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </div>
  );
}
