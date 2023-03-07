import CurrentRoutine from '../components/CurrentRoutine'
import HistoryCard from '../components/HistoryCard'

function Home({ currentRoutine, setDraft, setCurrentRoutine, history, setRefreshKey, setPreviousSession, previousSession }) {
    return (
        <div className='home-wrapper'>
            {history.length === 0 && Object.keys(currentRoutine).length === 0 ? <div className='no-history'>nothing</div> : null}
                {Object.keys(currentRoutine).length === 0 
                ?
                <div>{history.map((workout, index) => <HistoryCard key={index} workout={workout}/>)}</div> 
                :
                <CurrentRoutine setCurrentRoutine={setCurrentRoutine} currentRoutine={currentRoutine} setDraft={setDraft} setRefreshKey={setRefreshKey} setPreviousSession={setPreviousSession} previousSession={previousSession} />}
        </div>
    )
}

export default Home