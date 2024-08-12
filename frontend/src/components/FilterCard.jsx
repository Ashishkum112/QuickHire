import React from 'react'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


const filterData=[
    {
        filterType:"Location",
        array:["Delhi NCR","Bangalore","Hyderbad","Pune","Mumbai"]
    },
    {
        filterType:"Industry",
        array:["Frontend Developer","Backend Developer","Full-Stack Developer"]
    },
    {
        filterType:"Salary",
        array:["0-40k","42-1lakh","1lakh to 5lakh"]
    },
]

const FilterCard = () => {
  return (
    <div className='w-full bg-white p-3 rounded-md'>
        <h1 className='font-bold text-lg'>Filter Jobs</h1>
    <hr className='mt-3'/>
    <RadioGroup>
        {
            filterData.map((data,index)=>(
                <div>
                    <h1 className='font-bold text-lg'>{data.filterType}</h1>
                    {
                        data.array.map((item,index)=>{
                            return(
                                <div className='flex items-center space-x-2 my-2'>
                                    <RadioGroupItem value={item }/>
                                    <Label>{item}</Label>
                                </div>
                            )
                        })
                    }
                </div>
            ))
        }
    </RadioGroup>
    </div>
  )
}

export default FilterCard