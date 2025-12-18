import React, { memo } from 'react'

const ChildButton = memo (({onClick}) => {
    console.log("Child Rendered");
    
  return (
    <button className='btn btn-info' onClick={onClick} >Child Button</button>
  )
}
)
export default ChildButton