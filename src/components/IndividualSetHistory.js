import { CheckCircle } from '@mui/icons-material'
function IndividualSetHistory({ set, setNumber }) {
    return(
        <div className="exercise-grid">
            <div>{setNumber}</div>
            <input type='number' disabled defaultValue={set.split('x')[0]}></input>
            <input type='number' disabled defaultValue={set.split('x')[1]}></input>
            <CheckCircle className='set-checkmark'/>
        </div>
    )
}

export default IndividualSetHistory