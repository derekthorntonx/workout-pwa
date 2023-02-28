import Localbase from "localbase"

function Routine ({ routine, editMode }) {
    let db = new Localbase('db')

    function handleDelete() {
        db.collection('routines').doc(`${routine.key}`).delete()
    }

    return (
        <div className="individual-routine">
            {routine.data.name}
            {editMode ? <button onClick={handleDelete}>Delete</button> : null}
        </div>
    )
}

export default Routine