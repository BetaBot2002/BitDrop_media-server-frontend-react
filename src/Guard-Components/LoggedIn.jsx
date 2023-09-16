import React from 'react'
import { getRefreshToken } from '../Utility-Functions/LoginTokens'
import { Navigate } from 'react-router-dom'

const LoggedIn=({children})=> {
  if(!getRefreshToken()){
    return <Navigate to='/login'/>
  }else{
    return <>{children}</>
  }
}

export default LoggedIn
