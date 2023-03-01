import Localbase from "localbase"
import { Menu, MenuItem, Button } from '@mui/material'
import { useState } from 'react'
import { Settings } from '@mui/icons-material'

function Routine ({ routine, setRefreshKey, setEditFormVisible, setEditTarget }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl)
    let db = new Localbase('db')

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

    return (
        <div className="individual-routine">
            {routine.data.name}
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
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
        </div>
    )
}

export default Routine