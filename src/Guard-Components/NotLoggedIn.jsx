import React from 'react'

import { getRefreshToken } from '../Utility-Functions/LoginTokens'
import { Navigate } from 'react-router-dom'

const NotLoggedIn=({children})=> {
  if(!getRefreshToken()){
    return <>{children}</>
  }else{
    return <Navigate to='/'/>
  }
}

export default NotLoggedIn