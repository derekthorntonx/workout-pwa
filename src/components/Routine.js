import Localbase from "localbase"

function Routine ({ routine, setRefreshKey }) {
    let db = new Localbase('db')

    function handleDelete() {
        db.collection('routines').doc(`${routine.key}`).delete().then( () => {
        setRefreshKey(oldKey => !oldKey)})
    }

    return (
        <div className="individual-routine">
            {routine.data.name}
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default Routine