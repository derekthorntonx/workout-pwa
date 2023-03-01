import { Link } from 'react-router-dom'
import { BottomNavigation, BottomNavigationAction } from '@mui/material'
import { Home, Assessment, FitnessCenter } from '@mui/icons-material'

function Navbar () {

    return (
       <BottomNavigation className='navbar' sx={{backgroundColor: '#5DB8F3', height: '10vh'}} showLabels>
            <BottomNavigationAction label="Home" icon={<Home />} component={Link} to='/' />
            <BottomNavigationAction label="Tracking" icon={<Assessment />} component={Link} to='/tracking' />
            <BottomNavigationAction label="Routines" icon={<FitnessCenter />} component={Link} to='/routines' />
        </BottomNavigation>
    )
}

export default Navbar