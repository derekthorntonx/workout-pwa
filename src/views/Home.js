import CurrentRoutine from '../components/CurrentRoutine'

function Home({ prevWorkout, currentRoutine }) {
    console.log(prevWorkout)
    console.log(currentRoutine)
    return (
        <div>
            
            {Object.keys(currentRoutine).length === 0 ? null : <CurrentRoutine currentRoutine={currentRoutine}/>}
        </div>
    )
}

export default Home