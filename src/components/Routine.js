import Localbase from "localbase"
import { Menu, MenuItem, Button, Paper } from '@mui/material'
import { useState, useContext } from 'react'
import { Settings, PlayArrow } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { History } from "../context/History"

function Routine ({ routine, setRefreshKey, setEditFormVisible, setEditTarget, setCurrentRoutine, setDraft, setPreviousSession }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const history = useContext(History)
    const open = Boolean(anchorEl)
    let db = new Localbase('db')
    const navigate = useNavigate();

    const findSessionHistory = () => {
        let historyArray = []
        history.forEach(workout => {
            if (workout.cycle === routine.data.cycle && workout.workoutName === routine.data.name){
                historyArray.push(workout)
            }
        })
        return historyArray.slice(-1)
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
      }

    const handleDelete = () => {
        db.collection('routines').doc(`${routine.key}`).delete().then( () => {
        setRefreshKey(oldKey => !oldKey)
        handleClose()
        })
    }

    const handleEdit = () => {
        handleClose()
        setEditFormVisible(true)
        setEditTarget(routine)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleStart =  () => {
        setPreviousSession(findSessionHistory())
        
        setCurrentRoutine(routine)
        navigate('/')
        let date = new Date()
 
        //setLastWorkout(previousSession)

        let t2s = []
        routine.data.t2s.forEach(move => t2s.push({
                                                    name: move,
                                                    sets: ['0x0', '0x0', '0x0']
                                                    }))

        let t3s = []
        routine.data.t3s.forEach(move => t3s.push({
                                                    name: move,
                                                    sets: ['0x0', '0x0', '0x0']
                                                    }))

    
        let draft = {
            workoutName: routine.data.name,
            date: date.toISOString().split('T')[0],
            main: {name: routine.data.t1, sets:['0x0', '0x0', '0x0']},
            t2s,
            t3s,
            cycle: routine.data.cycle
        }

        setDraft(draft)
    }

    return (
        <div className="individual-routine">
            <Paper elevation={3} sx={{height: '7.5vh', marginBottom: '1%', background: 'pink', display: 'flex', alignItems: 'center', padding: '2%'}}>
                <PlayArrow onClick={handleStart}/>
                {routine.data.name}
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    sx={{position: "absolute", right: '0'}}
                >
                <Settings/>
                </Button>

                <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                >
                    <MenuItem onClick={handleEdit}>Edit</MenuItem>
                    <MenuItem onClick={handleDelete}>Delete</MenuItem>
                </Menu>
            </Paper>
        </div>
    )
}

export default Routine