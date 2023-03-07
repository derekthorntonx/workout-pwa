import { TextField, Button, Select, MenuItem } from '@mui/material'
import { useRef, useState } from 'react'
import Localbase from 'localbase'

function CreateTracker({ setTrackerFormVisible, setRefreshKey }) {
    let db = new Localbase('db')
    const nameRef = useRef()
    const weeklyGoalRef = useRef()
    const [measurement, setMeasurement] = useState('rep(s)')

    const handleCreateTracker = () => {
        if (nameRef.current.value === '' || weeklyGoalRef.current.value ==='')return
        console.log(measurement)
        db.collection('trackers').add({
            tracking: nameRef.current.value,
            goal: weeklyGoalRef.current.value,
            measurement: measurement,
            remaining: weeklyGoalRef.current.value
        })

        setRefreshKey(previous => !previous)
        setTrackerFormVisible(false)
        }
        
    return(
        <form className="create-tracker-form">
            <TextField placeholder='What to track...' variant="standard" required inputRef={nameRef}/>
            <div>
                <input type='number' required ref={weeklyGoalRef}/>
                <Select value={measurement} onChange={(e) => setMeasurement(e.target.value)}>
                    <MenuItem selected value='rep(s)'>Reps</MenuItem>
                    <MenuItem value='set(s)'>Sets</MenuItem>
                    <MenuItem value='min(s)'>Mins</MenuItem>
                    <MenuItem value='hour(s)'>Hours</MenuItem>
                    <MenuItem value='cal(s)'>Calories</MenuItem>
                </Select>
            </div>
            <Button variant='contained' onClick={handleCreateTracker}>Create</Button>
        </form>
    )
}

export default CreateTracker