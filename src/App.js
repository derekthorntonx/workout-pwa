import './App.css';
import Localbase from 'localbase';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Home from './views/Home'
import Routines from './views/Routines'
import NavBar from './components/Navbar'
import Tracking from './views/Tracking'
import { CurrentWorkout } from './context/CurrentWorkout'
import { History } from './context/History';

function App() {
  const [routineList, setRoutineList] = useState([])
  const [refreshKey, setRefreshKey] = useState(0)
  const [currentRoutine, setCurrentRoutine] = useState({})
  const [draft, setDraft] = useState([])
  const [history, setHistory] = useState([])
  const [trackers, setTrackers] = useState([])
  const [previousSession, setPreviousSession] = useState({})


  let db = new Localbase('db')

  const checkDate = (d) => {
      d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
      d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
      let yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
      let weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
      return [d.getUTCFullYear(), weekNo];
  }

  const resetWeeklies = async () => {
      let trackersList = await db.collection('trackers').get()
      trackersList.forEach(tracker => {
        db.collection('trackers').doc({tracking: tracker.tracking}).update({
          remaining: tracker.goal
        })
      })
  }

  // Get list of routines
  useEffect(() => {
    db.collection('routines').get({keys: true}).then(routines => setRoutineList(routines))
    db.collection('trackers').get().then(trackers => setTrackers(trackers))
  }, [refreshKey])

  useEffect(() => {
    db.collection('history').orderBy('date').get().then(history => setHistory(history.reverse()))
  }, [refreshKey])

  useEffect(() => {
    let weekOfYear = checkDate(new Date())
    if (localStorage.getItem("week") !== weekOfYear.toString()){
      localStorage.removeItem("week")
      localStorage.setItem("week", weekOfYear);
      resetWeeklies()
    }
  }, [])

  return (
    <CurrentWorkout.Provider value={draft}>
    <History.Provider value={history}>
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home setCurrentRoutine={setCurrentRoutine} currentRoutine={currentRoutine} setDraft={setDraft} history={history} setRefreshKey={setRefreshKey}/>} setPreviousSession={setPreviousSession} previousSession={previousSession}/>
        <Route path='/tracking' element={<Tracking setRefreshKey={setRefreshKey} trackers={trackers}/>} />
        <Route path='/routines' element={<Routines routineList={routineList} setRefreshKey={setRefreshKey} setCurrentRoutine={setCurrentRoutine} setDraft={setDraft} setPreviousSession={setPreviousSession} />} />
      </Routes>
      <NavBar/>
    </BrowserRouter>
    </div>
    </History.Provider>
    </CurrentWorkout.Provider>
  );
}

export default App;
