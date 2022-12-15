import React from 'react'
import { Navigate } from 'react-router-dom';
import { useGlobalContext } from '../context/appContext';
import { Loading } from '../components/Loading'


export const ProtectedRoute = ({children}) => {
    const {user, userLoading} = useGlobalContext();

    if(userLoading) return <Loading/>
    

    if(!user){
        return <Navigate to='/landing'></Navigate>
    }
    
    return children
}



