import CurrentRoutine from '../components/CurrentRoutine'
import { useContext } from 'react'

function Home({ currentRoutine, setDraft }) {
    return (
        <div>
            {Object.keys(currentRoutine).length === 0 ? null : <CurrentRoutine currentRoutine={currentRoutine} setDraft={setDraft}/>}
        </div>
    )
}

export default Home