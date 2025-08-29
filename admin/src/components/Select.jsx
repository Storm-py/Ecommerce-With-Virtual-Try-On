import React, { useId } from 'react'

const Select = ({
    label,
    options,
    className='', 
    ...props
},ref) => {
    const id=useId()
  return (
    <div className='w-full'>
        {label && <label className='' htmlFor={id}>{label}</label>}
        <select name="" id={id} className={`${className} px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration border border-gray-200 w-full`}
        ref={ref}
        {...props}>
          {
            options?.map((option,index)=>(
              <option key={index} value={option}>
                {option}
              </option>
            ))

          }
        </select>
    </div>
  )
}

export default React.forwardRef(Select);