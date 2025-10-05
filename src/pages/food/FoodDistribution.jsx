import React, { useEffect, useState } from 'react'
import { CaloricDeficit } from './CaloricDeficit.jsx'
import { CaloricSurplus } from './CaloricSurplus.jsx'
import { Maintenance } from './Maintenance.jsx'

export const FoodDistribution = () => {

  const [component, setComponent] = useState(undefined)

  const handleComponent = (select) => {
    switch (select) {
      case "deficit":
        setComponent(<CaloricDeficit />)
        console.log(select)
        break;
      case "surplus":
        setComponent(<CaloricSurplus />)
        console.log(select)
        break;
      case "maintenance":
        setComponent(<Maintenance />)
        console.log(select)
        break;

      default:
        break;
    }
  }




  return (
    <div>
      <h1 className='text-center font-semibold text-3xl py-4 px-4'>Here you will learn about food distribution according your objective</h1>
      <div className='text-center px-4 py-4'>
        <select name="select" id="select" onChange={(e) => handleComponent(e.target.value)} className='text-center rounded-lg border dark:bg-gray-900 '>
          <option value="">Select Distribution</option>
          <option value="deficit">Caloric Deficit</option>
          <option value="surplus">Caloric Surplus</option>
          <option value="maintenance">Caloric Maintenance </option>
        </select>
      </div>
      {component ? component : null}


    </div>
  )
}
