import Localbase from "localbase"
import { Menu, MenuItem, Button, Paper } from '@mui/material'
import { useState } from 'react'
import { Settings, PlayArrow } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

function Routine ({ routine, setRefreshKey, setEditFormVisible, setEditTarget, setCurrentRoutine, setDraft }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl)
    let db = new Localbase('db')
    const navigate = useNavigate();

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

    const handleStart = () => {
        setCurrentRoutine(routine)
        navigate('/')

        let t2s = []
        routine.data.t2s.forEach(move => t2s.push({
                                                    name: move,
                                                    sets: []
                                                    }))

        let t3s = []
        routine.data.t3s.forEach(move => t3s.push({
                                                    name: move,
                                                    sets: []
                                                    }))
        
        let draft = {
            workoutName: routine.data.name,
            date: Date.now(),
            main: [],
            t2s,
            t3s
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