import { Card, Button } from '@mui/material'
import Localbase from 'localbase'
import { useRef } from 'react'
import { DeleteForever } from '@mui/icons-material'

function Tracker({ tracker, setRefreshKey }) {
    let db = new Localbase('db')
    const valueRef = useRef()

    const handleIncrement = async () => {
        let newRemaining = Number(tracker.remaining) - Number(valueRef.current.value)
        
        await db.collection('trackers').doc({tracking: tracker.tracking}).update({
            remaining: newRemaining
        })
 
        setRefreshKey(previous => !previous)
         //ADD DATE TRACKING BY WEEK TO RESET
    }

    const handleDeleteTracker = () => {
        let confirm = window.confirm(`Delete ${tracker.tracking}?`)

        if (confirm){
            db.collection('trackers').doc({tracking: tracker.tracking}).delete()
            setRefreshKey(previous => !previous)
        }
    }

    return (
        <Card className='tracker-card' sx={{backgroundColor: 'skyblue'}}>
            <DeleteForever onClick={handleDeleteTracker} sx={{alignSelf: 'start', marginBottom: '5%'}} className='tracker-delete-button'/>
            <div style={{fontSize: '1.5rem', textAlign: 'center'}}>{tracker.tracking}</div>
            <div style={{fontSize: '1.2rem'}}>{tracker.remaining} {tracker.measurement} left</div>
            <input type='number' required ref={valueRef}></input>
            <Button color='success' variant='contained' onClick={handleIncrement}>Track</Button>
        </Card>
    )
}

export default Tracker