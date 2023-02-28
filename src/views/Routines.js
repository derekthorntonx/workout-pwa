import { useState, useEffect } from 'react'
import Routine from '../components/Routine'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import CreateForm from '../components/CreateForm'

function Routines ({ routineList }) {
    const [editMode, setEditMode] = useState(false)
    const [formVisible, setFormVisible] = useState(false)

    return (
        <div className='routine-wrapper'>
            {formVisible ? <CreateForm /> : <>
            {routineList.length === 0 ? <div>You haven't created any routines yet! Click on the Edit button to add some.</div> : null}
            {routineList.map((routine, index) => 
                <Routine key={index} routine={routine} editMode={editMode}/>
            )}
            {editMode ? <button onClick={() => {setFormVisible(true)}}>Create</button> : null}
            
            <button className={!editMode ? 'routine-edit-button' : 'routine-edit-button toggled'} onClick={() => {setEditMode(!editMode)}}><FontAwesomeIcon icon={faPenToSquare} size='3x' /></button>
            </>}
        </div>
    )
}

export default Routines