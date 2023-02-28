import { useRef } from 'react'
import Localbase from 'localbase'

function CreateForm() {
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
        })
    }

    return (
        <form className='create-routine-form'>
            <div>
                <label>Name: </label>
                <input type='text' required ref={nameRef}/>
            </div>

            <div>
                <label>Choose a main movement:</label>
                <input type='text' required ref={t1Ref}/>
            </div>

            <div>
                <label>Choose 2-3 assistance movements:</label>
                <input type='text' required ref={t2Ref1}/>
                <input type='text' required ref={t2Ref2}/>
                <input type='text' placeholder='Optional...' ref={t2Ref3}/>
            </div>

            <div>
                <label>Choose 2-4 accessory movements:</label>
                <input type='text' required ref={t3Ref1}/>
                <input type='text' required ref={t3Ref2}/>
                <input type='text' placeholder='Optional...' ref={t3Ref3}/>
                <input type='text' placeholder='Optional...' ref={t3Ref4}/>
            </div>

            <button onClick={handleCreateRoutine}>Create</button>
        </form>
    )
}

export default CreateForm