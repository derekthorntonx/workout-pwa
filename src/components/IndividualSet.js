import { CheckCircle } from '@mui/icons-material'
import { useState, useRef, useContext } from 'react'
import { CurrentWorkout } from '../context/CurrentWorkout'

function IndividualSet({ setNumber, repRange, exercise, setDraft, type, set }) {
    const [finished, setFinished] = useState(false)
    const weightRef = useRef()
    const repRef = useRef()
    const draft = useContext(CurrentWorkout)

    const handleSaveDraft = () => {
        if (repRef.current.value === '' || weightRef.current.value === '') return

        if (!finished){
            let setString = weightRef.current.value + 'x' + repRef.current.value
        
            if (type === 'main'){
                draft.main.sets[setNumber - 1] = setString
                setDraft(draft)

            } else if (type === 't2s') {
                draft.t2s.forEach(move => {if(exercise === Object.values(move)[0]){
                    Object.values(move)[1][setNumber -1] = setString
                    setDraft(draft)
                }})

            } else if (type === 't3s') {
                draft.t3s.forEach(move => {if(exercise === Object.values(move)[0]){
                    Object.values(move)[1][setNumber -1] = setString
                    setDraft(draft)
                }})
            }
        }


        if (finished){
           if (type === 'main'){
                draft.main.sets[setNumber - 1] = '0x0'
           } else if (type === 't2s') {
                draft.t2s.forEach(move => {if(exercise === Object.keys(move)[0]){
                Object.values(move)[0][setNumber -1] = '0x0'
                setDraft(draft)
                }})
           } else if (type === 't3s') {
                draft.t3s.forEach(move => {if(exercise === Object.keys(move)[0]){
                Object.values(move)[0][setNumber -1] = '0x0'
                setDraft(draft)
                }})
           }
        }

        setFinished(!finished)
    }


    return(
        <>
        {set === '0x0' ? <div className={finished ? "exercise-grid faded" : "exercise-grid"}>
            <div>{setNumber}</div>
            <input type='number' disabled={finished} ref={weightRef}></input>
            <input type='number' disabled={finished} ref={repRef} placeholder={`${repRange}`}></input>
            <CheckCircle className={finished ? 'set-checkmark finished' : 'set-checkmark'} onClick={handleSaveDraft}/>
        </div>
        :
        <div className={finished ? "exercise-grid faded" : "exercise-grid"}>
            <div>{setNumber}</div>
            <input type='number' disabled={finished} ref={weightRef} defaultValue={set.split('x')[0]}></input>
            <input type='number' disabled={finished} ref={repRef} defaultValue={set.split('x')[1]}></input>
            <CheckCircle className={finished ? 'set-checkmark finished' : 'set-checkmark'} onClick={handleSaveDraft}/>
        </div>
        }
        </>
    )
}

export default IndividualSet