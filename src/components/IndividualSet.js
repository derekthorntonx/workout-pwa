import { CheckCircle } from '@mui/icons-material'
import { useState, useRef, useContext } from 'react'
import Localbase from 'localbase'
import { CurrentWorkout } from '../context/CurrentWorkout'

function IndividualSet({ setNumber, repRange, exercise, setDraft, type }) {
    const [finished, setFinished] = useState(false)
    const weightRef = useRef()
    const repRef = useRef()
    const draft = useContext(CurrentWorkout)

    let db = new Localbase('db')

    const handleSaveDraft = () => {
        if (repRef.current.value === '' || weightRef.current.value === '') return

        if (!finished){
            let setString = weightRef.current.value + 'lbs x ' + repRef.current.value
        
            if (type === 'main'){
                draft.main[setNumber -1] = setString
                setDraft(draft)

            } else if (type === 't2s') {
                draft.t2s.forEach(move => {if(exercise === Object.keys(move)[0]){
                    Object.values(move)[0][setNumber -1] = setString
                    setDraft(draft)
                }})

            } else if (type === 't3s') {
                draft.t3s.forEach(move => {if(exercise === Object.keys(move)[0]){
                    Object.values(move)[0].push(setString)
                    setDraft(draft)
                }})
            }
        }


        if (finished){
           if (type === 'main'){
                draft.main[setNumber -1] = null
           } else if (type === 't2s') {
                draft.t2s.forEach(move => {if(exercise === Object.keys(move)[0]){
                Object.values(move)[0][setNumber -1] = null
                setDraft(draft)
                }})
           } else if (type === 't3s') {
                draft.t3s.forEach(move => {if(exercise === Object.keys(move)[0]){
                Object.values(move)[0][setNumber -1] = null
                setDraft(draft)
                }})
           }
        }

        setFinished(!finished)
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