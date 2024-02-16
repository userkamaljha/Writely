import React from 'react'

function Container({children}) {
  return (
    <div className='bg-[#f3f6f9] min-h-screen py-16'>
        {children}
    </div>
  )
}

export default Container