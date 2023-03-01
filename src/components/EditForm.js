import { useRef } from 'react'
import Localbase from 'localbase'
import { TextField, Button } from '@mui/material'

function EditForm ({ editTarget, setRefreshKey, setEditFormVisible }) {
    const nameRef = useRef()
    const t1Ref = useRef()
    const t2Ref1 = useRef()
    const t2Ref2 = useRef()
    const t2Ref3 = useRef()
    const t3Ref1 = useRef()
    const t3Ref2 = useRef()
    const t3Ref3 = useRef()
    const t3Ref4 = useRef()
    let db = new Localbase('db')

    const handleEditRoutine = () => {
        if (nameRef.current.value === '' || t1Ref.current.value === '' || t2Ref1.current.value === '' || t2Ref2.current.value === '' || t3Ref1.current.value === '' || t3Ref2.current.value === ''){ return console.log('failed step 1') }
        let t2Inputs = [t2Ref1.current.value, t2Ref2.current.value]
        if (t2Ref3.current.value !== ''){t2Inputs.push(t2Ref3.current.value)}

        let t3Inputs = [t3Ref1.current.value, t3Ref2.current.value]
        if (t3Ref3.current.value !== ''){t3Inputs.push(t3Ref3.current.value)}
        if (t3Ref4.current.value !== ''){t3Inputs.push(t3Ref4.current.value)}

        db.collection('routines').doc(`${editTarget.key}`).set({
            name: nameRef.current.value,
            t1: t1Ref.current.value,
            t2s: [...t2Inputs],
            t3s: [...t3Inputs]
        }).then( () => {
            setRefreshKey(oldKey => !oldKey)
            setEditFormVisible(false)})
    }

    return (
        <form className='create-routine-form'>

            <TextField placeholder={`${editTarget.data.name}`} defaultValue={editTarget.data.name} variant="standard" required inputRef={nameRef}/>
            
            <div className='create-routine-label'>
                <label>Main movement:</label>
                <TextField placeholder={`${editTarget.data.t1}`} defaultValue={editTarget.data.t1} variant="standard" required inputRef={t1Ref}/>
            </div>

            <div className='create-routine-label'>
                <label>Assistance movements:</label>
                <TextField placeholder={`${editTarget.data.t2s[0]}`} defaultValue={editTarget.data.t2s[0]} size='small' variant="standard" required inputRef={t2Ref1}/>
                <TextField placeholder={`${editTarget.data.t2s[1]}`} defaultValue={editTarget.data.t2s[1]} variant="standard" required inputRef={t2Ref2}/>
                <TextField placeholder={editTarget.data.t2s[2] === undefined ? 'Optional' : `${editTarget.data.t2s[2]}`} defaultValue={editTarget.data.t2s[2] === undefined ? '' : `${editTarget.data.t2s[2]}`} variant="standard" inputRef={t2Ref3}/>
            </div>

            <div className='create-routine-label'>
                <label>Accessory movements:</label>
                <TextField placeholder={`${editTarget.data.t3s[0]}`} defaultValue={editTarget.data.t3s[0]} variant="standard" required inputRef={t3Ref1}/>
                <TextField placeholder={`${editTarget.data.t3s[1]}`} defaultValue={editTarget.data.t3s[1]} variant="standard" required inputRef={t3Ref2}/>
                <TextField placeholder={editTarget.data.t3s[2] === undefined ? 'Optional' : `${editTarget.data.t3s[2]}`} defaultValue={editTarget.data.t3s[2] === undefined ? '' : `${editTarget.data.t3s[2]}`} variant="standard" inputRef={t3Ref3}/>
                <TextField placeholder={editTarget.data.t3s[3] === undefined ? 'Optional' : `${editTarget.data.t3s[3]}`} defaultValue={editTarget.data.t3s[3] === undefined ? '' : `${editTarget.data.t3s[3]}`} variant="standard" inputRef={t3Ref4}/>
            </div>

            <Button variant='contained' onClick={handleEditRoutine}>Edit</Button>

        </form>
    )
}

export default EditForm