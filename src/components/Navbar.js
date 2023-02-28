import { Link } from 'react-router-dom'

function Navbar () {
    return (
        <div className="navbar">
            <Link to='/'>Home</Link>
            <Link to='/tracking'>Tracking</Link>
            <Link to='/routines'>Routines</Link>
        </div>
    )
}

export default Navbar