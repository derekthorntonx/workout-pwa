import CurrentRoutine from '../components/CurrentRoutine'

function Home({ currentRoutine }) {
    return (
        <div>
            {Object.keys(currentRoutine).length === 0 ? null : <CurrentRoutine currentRoutine={currentRoutine}/>}
        </div>
    )
}

export default Home