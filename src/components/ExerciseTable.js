import { AddCircle, Clear } from '@mui/icons-material'
import { useState } from 'react'
import IndividualSet from './IndividualSet'


function ExerciseTable({ exercise, repRange, setDraft }) {
    
    const [sets, setSets] = useState(3)
    const setRows = []

    for (let i = 1; i < sets + 1; i++){
        setRows.push(<IndividualSet key={i} setNumber={i} repRange={repRange} exercise={exercise} setDraft={setDraft} />)
    }

    const handleAddSet = () => {
        if (sets >= 5) return
        setSets(previous => previous + 1)
    }

    const handleDeleteSet = () => {
        setSets(previous => previous - 1)
    }

    return (
        <div>
            <div className="exercise-name">{exercise}</div>
            <div className="exercise-grid">
                <div>Set</div>
                <div>Previous</div>
                <div>Weight</div>
                <div>Reps</div>
            </div>

            <div>{setRows}</div>

            <div style={{display: 'flex', alignItem: 'center', justifyContent: 'center', marginTop: '1%'}}><AddCircle onClick={handleAddSet}/></div>

        </div>
    )
}

export default ExerciseTable