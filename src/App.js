import { lazy, Suspense, useState } from 'react';
import { HashRouter as BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/Navbar/Navbar';
import { Preloader } from './components/Preloader/Preloader';

const About = lazy(() =>
  import('./pages/About/About').then(m => ({ default: m.About }))
);
const Commissions = lazy(() =>
  import('./pages/Commisions/Commissions').then(m => ({
    default: m.Commissions
  }))
);
const Contact = lazy(() =>
  import('./pages/Contact/Contact').then(m => ({ default: m.Contact }))
);
const Home = lazy(() =>
  import('./pages/Home/Home').then(m => ({ default: m.Home }))
);
const Originals = lazy(() =>
  import('./pages/Originals/Originals').then(m => ({ default: m.Originals }))
);
const Paintings = lazy(() =>
  import('./pages/Paintings/Paintings').then(m => ({ default: m.Paintings }))
);
const Prints = lazy(() =>
  import('./pages/Prints/Prints').then(m => ({ default: m.Prints }))
);

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className='App'>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <BrowserRouter>
        <Navbar />
        <Suspense fallback={null}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/originals' element={<Originals />} />
            <Route path='/prints' element={<Prints />} />
            <Route path='/commissions' element={<Commissions />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/paintings/:id' element={<Paintings />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
