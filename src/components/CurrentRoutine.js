import { History, CheckCircle } from '@mui/icons-material'
import ExerciseTable from './ExerciseTable'
import { useState } from 'react'

function CurrentRoutine({ currentRoutine, setDraft }) {
    let t1Range, t2Range, t3Range
    const assistanceExercises = [...currentRoutine.data.t2s]
    const accessoryExercises = [...currentRoutine.data.t3s]

    //TODO: Get previous workout of same name, use previous lift numbers to set placeholder values

    // Change rep ranges depending on week cycle number
    switch (currentRoutine.data.cycle){
        case 1:
            t1Range = 10
            t2Range = 12
            t3Range = 16
            break
        
        case 2: 
            t1Range = 8
            t2Range = 10
            t3Range = 14
            break

        case 3: 
            t1Range = 6
            t2Range = 8
            t3Range = 12
            break

        default:
            break
    }

    const handleHistory = () => {
        console.log('clicked history button')
    }

    const handleSubmit = () => {
        console.log('clicked submit button')
    }

    return (
        <form className="current-routine-form">
            <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', paddingBottom: '2.5%'}}>
                <History fontSize='large' sx={{padding: '5%'}} onClick={handleHistory} />
                <CheckCircle fontSize='large' sx={{padding: '5%'}} onClick={handleSubmit} />
            </div>

            <div className='current-routine-label'>{currentRoutine.data.name}</div>

            <div style={{width: '100%'}}>
                <ExerciseTable exercise={currentRoutine.data.t1} repRange={t1Range} setDraft={setDraft}/>
            </div>

            <div style={{width: '100%'}}>
                {assistanceExercises.map(exercise => <ExerciseTable key={exercise} exercise={exercise} repRange={t2Range} setDraft={setDraft} />)}
            </div>

            <div style={{width: '100%'}}>
                {accessoryExercises.map(exercise => <ExerciseTable key={exercise} exercise={exercise} repRange={t3Range} setDraft={setDraft} />)}
            </div>

        </form>
    )
}

export default CurrentRoutine