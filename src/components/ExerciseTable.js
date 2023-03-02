import { AddCircle } from '@mui/icons-material'

function ExerciseTable({ exercise }) {

    let setCount = 3

    const handleAddSet = () => {
        console.log('clicked button')
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

            <div className="exercise-grid">
                <div>1</div>
                <div>185x10</div>
                <input type='number'></input>
                <input type='number' placeholder='10'></input>
            </div>

            <div className="exercise-grid">
                <div>2</div>
                <div>185x10</div>
                <input type='number'></input>
                <input type='number' placeholder='10'></input>
            </div>

            <div className="exercise-grid">
                <div>3</div>
                <div>185x10</div>
                <input type='number'></input>
                <input type='number' placeholder='10'></input>
            </div>

            <div className="exercise-grid">
                <div>4</div>
                <div>185x10</div>
                <input type='number'></input>
                <input type='number' placeholder='10'></input>
            </div>

            <div className="exercise-grid">
                <div>5</div>
                <div>185x10</div>
                <input type='number'></input>
                <input type='number' placeholder='10'></input>
            </div>

            <div style={{display: 'flex', alignItem: 'center', justifyContent: 'center'}}><AddCircle onClick={handleAddSet} /></div>

        </div>
    )
}

export default ExerciseTable