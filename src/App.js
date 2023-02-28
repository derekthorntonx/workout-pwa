import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './views/Home'
import Routines from './views/Routines'
import NavBar from './components/Navbar'
import Tracking from './views/Tracking'

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/tracking' element={<Tracking/>} />
        <Route path='/routines' element={<Routines/>} />
      </Routes>
      <NavBar/>
    </BrowserRouter>
    </div>
  );
}

export default App;
