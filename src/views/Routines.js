import { useState } from 'react'
import Routine from '../components/Routine'
import CreateForm from '../components/CreateForm'
import EditForm from '../components/EditForm'
import { Fab } from '@mui/material'
import { Add, Announcement } from '@mui/icons-material'

function Routines ({ routineList, setRefreshKey }) {
    const [formVisible, setFormVisible] = useState(false)
    const [editFormVisible, setEditFormVisible] = useState(false)
    const [editTarget, setEditTarget] = useState(null)

    const handleCreate = () => {
        setFormVisible(true)
    }

    return (
        <div className='routine-wrapper'>
            {formVisible ? <CreateForm setRefreshKey={setRefreshKey} setFormVisible={setFormVisible} /> : null}
            {editFormVisible ? <EditForm setRefreshKey={setRefreshKey} setEditFormVisible={setEditFormVisible} editTarget={editTarget}/> : null}

            {!formVisible && !editFormVisible ?
            <>
            {routineList.length === 0 ? <div className='blank-routines-page'>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                        <Announcement fontSize='large'/>
                        <p>No routines found!</p>
                    </div>
                </div> : null}
            {routineList.map((routine, index) => 
                <Routine key={index} routine={routine} setRefreshKey={setRefreshKey} setEditFormVisible={setEditFormVisible} setEditTarget={setEditTarget}/>
            )}
            <Fab onClick={handleCreate} className='create-routine-button' sx={{background: 'peachpuff', position: 'absolute', right: '10%', bottom: '15%'}}> <Add/> </Fab>
            </>
            : null}
        </div>
    )
}

export default Routines