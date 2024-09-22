import useUserStore from '../store/store'
import {Outlet, Navigate} from 'react-router-dom'

export default function ProtectedRoute() {
    const user = useUserStore(state => state.user);

    return user? <Outlet/> : <Navigate to={'/signin'}/>
}
