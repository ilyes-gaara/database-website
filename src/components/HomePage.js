import React, { useEffect } from 'react'
import MenuBar from './MenuBar';
import { useAuth } from '../contexts/AuthContext';

function HomePage() {
    const { currentUser, logout } = useAuth();
    return (
        <div>
        
           <MenuBar/>
        </div>
    )
}

export default HomePage
