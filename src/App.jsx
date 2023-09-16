import { useState } from 'react'
// import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './Components/Login'
import Home from './Components/Home'
import LoggedIn from './Guard-Components/LoggedIn'
import NotLoggedIn from './Guard-Components/NotLoggedIn'
import View from './Components/View'
import ViewAudios from './Components/ViewAudios'
import ViewVideos from './Components/ViewVideos'
import ViewImages from './Components/ViewImages'
import ViewOthers from './Components/ViewOthers'
import AudioFile from './Components/AudioFile'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to='/home'/>} />
        <Route path='/login' element={<NotLoggedIn><Login /></NotLoggedIn>} />
        <Route path='/home' element={<LoggedIn><Home /></LoggedIn>} />
        <Route path='/home/view-files' element={<LoggedIn><View/></LoggedIn>} />
        <Route path='/home/view-files/audios' element={<LoggedIn><ViewAudios/></LoggedIn>} />
        <Route path='/home/view-files/videos' element={<LoggedIn><ViewVideos/></LoggedIn>} />
        <Route path='/home/view-files/images' element={<LoggedIn><ViewImages/></LoggedIn>} />
        <Route path='/home/view-files/others' element={<LoggedIn><ViewOthers/></LoggedIn>} />
        {/* <Route path='/demo' element={<AudioFile/>} /> */}
        <Route path='*' element={<h1>Not Found</h1>} />
      </Routes>
    </>
  )
}

export default App
