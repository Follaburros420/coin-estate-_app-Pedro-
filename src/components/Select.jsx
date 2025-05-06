// import clsxm from '@/utils/clsxm'
// import React from 'react'
// import { Controller } from 'react-hook-form'

// export default function CustomSelect({ label, name, errors, options, control }) {
//   return (
//     <div>
//       <div className='w-full'>
//         <label htmlFor="">{label}</label>
//         <Controller
//           name={name}
//           control={control}
//           defaultValue=""
//           render={({ field }) => (
//             <select {...field}
//               className={clsxm('w-full p-3 text-gray-light outline-none rounded-[8px] bg-[transparent]  sm:text-md focus:ring-blue-300',
//                 errors ? 'border-2 border-[red]' : 'border border-gray-light')}
//             >
//               {/* <option value="" disabled >Select House Condition</option> */}
//               {options?.map((item, idx) => {
//                 return <option value={item} key={idx} className='capitalize'>{item}</option>
//               })}
//             </select>
//           )}
//         />
//         {errors && <p>{errors.message}</p>}
//       </div>
//     </div>
//   )
// }
import clsxm from '@/utils/clsxm';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';

export default function CustomSelect({ label, name, errors, options, control, setValue, isCustom = true, className }) {
  const [customOptions, setCustomOptions] = useState([...options, isCustom && 'custom']);
  const [customValue, setCustomValue] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleAddCustomValue = () => {
    if (customValue.trim() !== '' && !customOptions.includes(customValue)) {
      const updatedOptions = [...customOptions.slice(0, -1), customValue, 'custom'];
      setCustomOptions(updatedOptions); // Update dropdown options
      setValue(name, customValue); // Set the selected value
      setShowInput(false);
      setCustomValue('');
    }
  };

  return (
    <div>
      <div className='w-full'>
        <label htmlFor={name} className='block'>
          {label}
        </label>
        <Controller
          name={name}
          control={control}
          defaultValue=''
          render={({ field }) => (
            <>
              {!showInput && (
                <select
                  {...field}
                  onChange={(e) => {
                    if (e.target.value === 'custom') {
                      setShowInput(true);
                    } else {
                      field.onChange(e.target.value);
                      setShowInput(false);
                    }
                  }}
                  className={clsxm(
                    'w-full p-3 text-gray-700 outline-none rounded-lg bg-[transparent] border',
                  errors ? 'border-red-500' : 'border-gray-300',  className
                  )}>
                  {customOptions.map((item, idx) => {
                    if (item)
                      return (
                        <option
                          key={idx}
                          value={item}
                          className='capitalize bg-black-600 mt-2 rounded-sm py-2 border-y-1'>
                          {item === 'custom' ? '+ Add Custom Value' : item}
                        </option>
                      );
                  })}
                </select>
              )}

              {/* Show Input for Custom Value */}
              {showInput && (
                <div className='flex gap-2'>
                  <input
                    type='text'
                    autoFocus
                    placeholder='Enter custom value'
                    value={customValue}
                    onChange={(e) => setCustomValue(e.target.value)}
                    className='w-full p-2 border rounded-[8px] bg-[transparent] outline-none'
                  />
                  <button
                    type='button'
                    onClick={handleAddCustomValue}
                    className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'>
                    Add
                  </button>
                </div>
              )}
            </>
          )}
        />
        {errors && <p className='text-red-500 text-sm mt-1'>{errors.message}</p>}
      </div>
    </div>
  );
}
