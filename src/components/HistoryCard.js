import { Paper } from '@mui/material'

function HistoryCard({ workout }) {

    return (
        <Paper className='individual-workout-history' sx={{background: 'pink'}}>
            <div style={{fontSize: '1.2rem'}}>{workout.workoutName}</div>
            <div>{workout.date}</div>
            
            <div style={{fontSize: '0.9rem'}}>
                {workout.main.name}: {workout.main.sets.join(', ')}
            </div>

            <div style={{fontSize: '0.9rem'}}>{workout.t2s.map((exercise, index) => 
                <div key={index}>
                    {exercise.name}: {exercise.sets.join(', ')}
                </div>
                )}
            </div>

            <div style={{fontSize: '0.9rem'}}>{workout.t3s.map((exercise, index) => 
                <div key={index}>
                    {exercise.name}: {exercise.sets.join(', ')}
                </div>
                )}
            </div>
            
        </Paper>
    )
}

export default HistoryCard