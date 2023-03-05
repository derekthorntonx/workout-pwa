import { Paper } from '@mui/material'

function HistoryCard({ workout }) {

    return (
        <Paper className='individual-workout-history' sx={{background: 'pink'}}>
            <div>{workout.workoutName}</div>
            <div>{workout.date}</div>
            
            <div>
                {workout.main.name}: {workout.main.sets.join(', ')}
            </div>

            <div>{workout.t2s.map((exercise, index) => 
                <div key={index}>
                    {exercise.name}: {exercise.sets.join(', ')}
                </div>
                )}
            </div>

            <div>{workout.t3s.map((exercise, index) => 
                <div key={index}>
                    {exercise.name}: {exercise.sets.join(', ')}
                </div>
                )}
            </div>
            
        </Paper>
    )
}

export default HistoryCard