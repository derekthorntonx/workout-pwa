import './App.css';
import Localbase from 'localbase';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Home from './views/Home'
import Routines from './views/Routines'
import NavBar from './components/Navbar'
import Tracking from './views/Tracking'
import { CurrentWorkout } from './context/CurrentWorkout'

function App() {
  const [routineList, setRoutineList] = useState([])
  const [refreshKey, setRefreshKey] = useState(0)
  const [prevWorkout, setPrevWorkout] = useState({})
  const [currentRoutine, setCurrentRoutine] = useState({})
  const [draft, setDraft] = useState([])

  let db = new Localbase('db')

  // Get list of routines
  useEffect(() => {
    db.collection('routines').get({keys: true}).then(routines => setRoutineList(routines))
  }, [refreshKey])

  // Get most recent workout document from history to determine upcoming workout
  useEffect(() => {
    db.collection('history').orderBy('date').limit(1).get().then(history => setPrevWorkout(history))
  }, [])

  return (
    <CurrentWorkout.Provider value={draft}>
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home prevWorkout={prevWorkout} currentRoutine={currentRoutine} setDraft={setDraft}/>} />
        <Route path='/tracking' element={<Tracking/>} />
        <Route path='/routines' element={<Routines routineList={routineList} setRefreshKey={setRefreshKey} setCurrentRoutine={setCurrentRoutine} setDraft={setDraft} />} />
      </Routes>
      <NavBar/>
    </BrowserRouter>
    </div>
    </CurrentWorkout.Provider>
  );
}

export default App;
