import { CheckCircle } from '@mui/icons-material'
import { useState, useRef, useContext } from 'react'
import Localbase from 'localbase'
import { CurrentWorkout } from '../context/CurrentWorkout'

function IndividualSet({ setNumber, repRange, exercise, setDraft }) {
    const [finished, setFinished] = useState(false)
    const weightRef = useRef()
    const repRef = useRef()
    const draft = useContext(CurrentWorkout)

    let db = new Localbase('db')

    const handleSaveDraft = () => {
        if (repRef.current.value === '' || weightRef.current.value === '') return
        if (!finished){
            let setString = weightRef.current.value + 'lbs x ' + repRef.current.value
            console.log(draft.t2s)

            //loop through array for matching exercise name, then push new set into array?
        }
        //FIX ME ^^^^^^^
        //FIX ME ^^^^^^^
        //FIX ME ^^^^^^^
        //FIX ME ^^^^^^^

        setFinished(!finished)
        console.log('weight: ', weightRef.current.value, "reps: ", repRef.current.value, exercise, setNumber)

        
    }

    return(
        <div className={finished ? "exercise-grid faded" : "exercise-grid"}>
                <div>{setNumber}</div>
                <div>185x10</div>
                <input type='number' disabled={finished} ref={weightRef}></input>
                <input type='number' disabled={finished} ref={repRef} placeholder={`${repRange}`}></input>
                <CheckCircle className={finished ? 'set-checkmark finished' : 'set-checkmark'} onClick={handleSaveDraft}/>
            </div>
    )
}

export default IndividualSet