import useUserStore from '../store/store'
import {Outlet, Navigate} from 'react-router-dom'

export default function AdminRoute() {
    const user = useUserStore(state => state.user);
    
    return user && user.userRole === 'admin' ? <Outlet/> : <Navigate to={'/'}/>
}