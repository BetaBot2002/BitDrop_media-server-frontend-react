import React from 'react'
import '../CSS/View.css'
import { Link } from 'react-router-dom'

const View = () => {
    return (
        <div className="View-Body">
            <div className='View-Container'>
                <div className="upper">
                    <div className="type"><Link className='link' to='audios'>Audios</Link></div>
                    <div className="type"><Link className='link' to='videos'>Videos</Link></div>
                </div>
                <div className="lower">
                    <div className="type"><Link className='link' to='images'>Images</Link></div>
                    <div className="type"><Link className='link' to='others'>Others</Link></div>
                </div>
            </div>
        </div>
    )
}

export default View
