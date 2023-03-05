import CurrentRoutine from '../components/CurrentRoutine'
import HistoryCard from '../components/HistoryCard'

function Home({ currentRoutine, setDraft, setCurrentRoutine, history, setRefreshKey }) {
    return (
        <div className='home-wrapper'>
            <div className='workout-history-list'>
                {Object.keys(currentRoutine).length === 0 
                ?
                <div>{history.map((workout, index) => <HistoryCard key={index} workout={workout}/>)}</div> 
                :
                <CurrentRoutine setCurrentRoutine={setCurrentRoutine} currentRoutine={currentRoutine} setDraft={setDraft} setRefreshKey={setRefreshKey}/>}
            </div>
        </div>
    )
}

export default Home