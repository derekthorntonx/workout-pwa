import { useRef } from 'react'
import Localbase from 'localbase'
import { TextField, Button } from '@mui/material'

function CreateForm({ setRefreshKey, setFormVisible }) {
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

    function handleCreateRoutine() {
        if (nameRef.current.value === '' || t1Ref.current.value === '' || t2Ref1.current.value === '' || t2Ref2.current.value === '' || t3Ref1.current.value === '' || t3Ref2.current.value === ''){ return }
        let t2Inputs = [t2Ref1.current.value, t2Ref2.current.value]
        if (t2Ref3.current.value !== ''){t2Inputs.push(t2Ref3.current.value)}

        let t3Inputs = [t3Ref1.current.value, t3Ref2.current.value]
        if (t3Ref3.current.value !== ''){t3Inputs.push(t3Ref3.current.value)}
        if (t3Ref4.current.value !== ''){t3Inputs.push(t3Ref4.current.value)}

        db.collection('routines').add({
            name: nameRef.current.value,
            t1: t1Ref.current.value,
            t2s: [...t2Inputs],
            t3s: [...t3Inputs]
        }).then( () => {
            setRefreshKey(oldKey => !oldKey)
            setFormVisible(false)})
    }

    return (
        <form className='create-routine-form'>

            <TextField placeholder='Routine name' variant="standard" required inputRef={nameRef}/>
            
            <div className='create-routine-label'>
                <label>Main movement:</label>
                <TextField variant="standard" required inputRef={t1Ref}/>
            </div>

            <div className='create-routine-label'>
                <label>Assistance movements:</label>
                <TextField size='small' variant="standard" required inputRef={t2Ref1}/>
                <TextField variant="standard" required inputRef={t2Ref2}/>
                <TextField variant="standard" placeholder='Optional' inputRef={t2Ref3}/>
            </div>

            <div className='create-routine-label'>
                <label>Accessory movements:</label>
                <TextField variant="standard" required inputRef={t3Ref1}/>
                <TextField variant="standard" required inputRef={t3Ref2}/>
                <TextField variant="standard" placeholder='Optional' inputRef={t3Ref3}/>
                <TextField variant="standard" placeholder='Optional' inputRef={t3Ref4}/>
            </div>

            <Button variant='contained' onClick={handleCreateRoutine}>Create</Button>
        </form>
    )
}

export default CreateForm