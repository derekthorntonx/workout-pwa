import { useState } from 'react'
import Routine from '../components/Routine'
import CreateForm from '../components/CreateForm'
import { Fab } from '@mui/material'
import { Add, Announcement } from '@mui/icons-material'

function Routines ({ routineList, setRefreshKey }) {
    const [formVisible, setFormVisible] = useState(false)

    const handleClick = () => {
        setFormVisible(true)
    }

    return (
        <div className='routine-wrapper'>
            {formVisible ? <CreateForm setRefreshKey={setRefreshKey} setFormVisible={setFormVisible} /> : <>
            {routineList.length === 0 ? <div className='blank-routines-page'>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                        <Announcement fontSize='large'/>
                        <p>No routines found!</p>
                    </div>
                </div> : null}
            {routineList.map((routine, index) => 
                <Routine key={index} routine={routine} setRefreshKey={setRefreshKey}/>
            )}
            
            <Fab onClick={handleClick} className='create-routine-button' sx={{background: 'peachpuff', position: 'absolute', right: '10%', bottom: '15%'}}> <Add/> </Fab>
            </>}
        </div>
    )
}

export default Routines