import { useState } from 'react';
import { HashRouter as BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Preloader } from './components/Preloader/Preloader';
import { Navbar } from './components/Navbar/Navbar';
import { About } from './pages/About/About';
import { Commissions } from './pages/Commisions/Commissions';
import { Contact } from './pages/Contact/Contact';
import { Home } from './pages/Home/Home';
import { Originals } from './pages/Originals/Originals';
import { Paintings } from './pages/Paintings/Paintings';
import { Prints } from './pages/Prints/Prints';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className='App'>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/originals' element={<Originals />} />
          <Route path='/prints' element={<Prints />} />
          <Route path='/commissions' element={<Commissions />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/paintings/:id' element={<Paintings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
