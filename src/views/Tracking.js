import { Fab } from '@mui/material'
import { Add } from '@mui/icons-material'
import { useState } from 'react'
import CreateTracker from '../components/CreateTracker'
import Tracker from '../components/Tracker'

function Tracking ({setRefreshKey, trackers}) {
    const [trackerFormVisible, setTrackerFormVisible] = useState(false)

    const handleAddTracker = () => {
        setTrackerFormVisible(true)
    }

    return (
        <>
            {trackerFormVisible
            ?
            <div>
            <CreateTracker setRefreshKey={setRefreshKey} setTrackerFormVisible={setTrackerFormVisible} />
            </div>
            :
            <div className="tracking-wrapper">
            {trackers.map((tracker, index) => <Tracker key={index} tracker={tracker} setRefreshKey={setRefreshKey}/>)}
            <Fab className='create-routine-button' onClick={handleAddTracker} sx={{backgroundColor: 'cyan', position: 'fixed', right: '10%', bottom: '15%'}}> <Add/> </Fab>
            </div>     
            }
        </>
    )
}

export default Tracking