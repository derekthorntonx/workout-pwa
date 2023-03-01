import './App.css';
import Localbase from 'localbase';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Home from './views/Home'
import Routines from './views/Routines'
import NavBar from './components/Navbar'
import Tracking from './views/Tracking'

function App() {
  const [routineList, setRoutineList] = useState([])
  const [refreshKey, setRefreshKey] = useState(0)
  
  let db = new Localbase('db')

  useEffect(() => {
    db.collection('routines').get({keys: true}).then(routines => setRoutineList(routines))
    }, [refreshKey])

  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/tracking' element={<Tracking/>} />
        <Route path='/routines' element={<Routines routineList={routineList} setRefreshKey={setRefreshKey} />} />
      </Routes>
      <NavBar/>
    </BrowserRouter>
    </div>
  );
}

export default App;
