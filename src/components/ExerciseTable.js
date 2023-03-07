import { useContext } from 'react'
import IndividualSet from './IndividualSet'
import IndividualSetHistory from './IndividualSetHistory'
import { CurrentWorkout } from '../context/CurrentWorkout'


function ExerciseTable({ exercise, repRange, setDraft, type, sets, setSets, setRender, history }) {
    
    const draft = useContext(CurrentWorkout)
    
    const handleAddSet = (e) => {
        e.preventDefault()
        if (sets.length > 4) return
        sets.push('0x0')
        setSets(sets)
        console.log(sets)
        setRender(previous => !previous)
    }

    const handleDeleteSet = (e) => {
        e.preventDefault()
        if (sets.length < 4) return
        sets.pop()
        setSets(sets)
        console.log(sets)
        setRender(previous => !previous)
    }

    return (
        <>
        {!history
        ?
        <div className='exercise-table'>
            <div className="exercise-name">{exercise}</div>
            <div className="exercise-grid">
                <div>Set</div>
                <div>Weight</div>
                <div>Reps</div>
            </div>

            {sets.map((set, index) => <IndividualSet set={set} key={index} setNumber={index +1} exercise={exercise} repRange={repRange} setDraft={setDraft} type={type} />)}

            <div style={{display: 'flex', alignItem: 'center', justifyContent: 'center', marginTop: '1%', gap: '2.5%'}}>
                <button disabled={sets.length <= 3} onClick={handleDeleteSet}>-</button><button disabled={sets.length >= 5} onClick={handleAddSet}>+</button>
                </div>
        </div>
        :
        <div className='exercise-table'>
            <div className="exercise-name">{exercise}</div>
            <div className="exercise-grid">
                <div>Set</div>
                <div>Weight</div>
                <div>Reps</div>
            </div>

            {sets.map((set, index) => <IndividualSetHistory set={set} key={index} setNumber={index +1} exercise={exercise} />)}
            <div style={{display: 'flex', alignItem: 'center', justifyContent: 'center', marginTop: '1%', gap: '2.5%', visibility: 'hidden'}}>
                <button disabled={true}>-</button><button disabled={true}>+</button>
                </div>
        </div>
        }
        </>
    )
}

export default ExerciseTable