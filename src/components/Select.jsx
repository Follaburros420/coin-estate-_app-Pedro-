import clsxm from '@/utils/clsxm'
import React from 'react'
import { Controller } from 'react-hook-form'

export default function CustomSelect({ label,name, errors, options, control }) {
  return (
    <div>
      <div className='w-full'>
        <label htmlFor="">{label}</label>
        <Controller
          name={name}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <select {...field}
              className={clsxm('w-full p-3 text-gray-light outline-none rounded-[8px] bg-[transparent]  sm:text-md focus:ring-blue-300',
                errors ? 'border-2 border-[red]' : 'border border-gray-light')}
            >
              {/* <option value="" disabled >Select House Condition</option> */}
              {options?.map((item, idx) => {
                return <option value={item} key={idx} className='capitalize'>{item}</option>
              })}
            </select>
          )}
        />
        {errors && <p>{errors.message}</p>}
      </div>
    </div>
  )
}
