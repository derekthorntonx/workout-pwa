import { History, CheckCircle, DeleteForever } from '@mui/icons-material'
import ExerciseTable from './ExerciseTable'
import { useState, useContext, useEffect } from 'react'
import { CurrentWorkout } from '../context/CurrentWorkout'
import Localbase from 'localbase'

function CurrentRoutine({ currentRoutine, setDraft, setCurrentRoutine, setRefreshKey, previousSession, setPreviousSession }) {
    let t1Range, t2Range, t3Range
    const draft = useContext(CurrentWorkout)
    const [assistanceExercises, setAssistanceExercises] = useState([])
    const [accessoryExercises, setAccessoryExercises] = useState([])
    const [sets, setSets] = useState([])
    const [render, setRender] = useState(0)
    let db = new Localbase('db')

    useEffect(() => {
        setAssistanceExercises(draft.t2s)
        setAccessoryExercises(draft.t3s)
    }, [draft, render])

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

    const handleTrash = () => {
        let confirmation = window.confirm('Discard current workout?')
        if(confirmation){
            setDraft({})
            setCurrentRoutine({})
        }
        return
    }

    const handleHistory = () => {
        console.log('clicked history button')
        console.log(draft)
    }

    const handleSubmit = async () => {
        let confirmation = window.confirm('Finish and save current workout?')
        if (confirmation){
            let updatedCycle = currentRoutine.data.cycle + 1
            if (updatedCycle >= 4){
                updatedCycle = 1
            }
            db.collection('history').add(draft)
            await db.collection('routines').doc({name: currentRoutine.data.name}).update({
                cycle: updatedCycle
            })
        }
        setRefreshKey(previous => !previous)
        setCurrentRoutine({})
        setPreviousSession({})
    }

    return (
        <form className="current-routine-form">
            <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', paddingBottom: '2.5%'}}>
                <History fontSize='large' sx={{padding: '5%'}} onClick={handleHistory} />
                <DeleteForever fontSize='large' sx={{padding: '5%'}} onClick={handleTrash} />
                <CheckCircle fontSize='large' sx={{padding: '5%'}} onClick={handleSubmit} />
            </div>

            <div className='current-routine-label'>{currentRoutine.data.name}</div>
            <div>Week {currentRoutine.data.cycle}</div>

            <div style={{width: '90%'}}>
                <ExerciseTable exercise={currentRoutine.data.t1} repRange={t1Range} setDraft={setDraft} type={'main'} sets={draft.main.sets} setSets={setSets} setRender={setRender} />
            </div>

            <div style={{width: '90%'}}>
                {assistanceExercises.map(exercise => <ExerciseTable key={exercise.name} exercise={exercise.name} repRange={t2Range} setDraft={setDraft} type={'t2s'} sets={exercise.sets} setSets={setSets} setRender={setRender} />)}
            </div>

            <div style={{width: '90%'}}>
                {accessoryExercises.map(exercise => <ExerciseTable key={exercise.name} exercise={exercise.name} repRange={t3Range} setDraft={setDraft} type={'t3s'} sets={exercise.sets} setSets={setSets} setRender={setRender} />)}
            </div>

        </form>
    )
}

export default CurrentRoutine