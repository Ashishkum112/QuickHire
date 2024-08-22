import React, { useEffect, useState } from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '../redux/jobSlice';
import { useColorMode } from '@chakra-ui/react';

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "Full-Stack Developer", "Data Science"]
    },
    {
        filterType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
];

const FilterCard = () => {
    const { colorMode } = useColorMode(); // Get the current color mode
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    };

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue, dispatch]);

    return (
        <div className={`w-full p-3 rounded-md ${colorMode === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <h1 className={`font-bold text-lg ${colorMode === 'dark' ? 'text-white' : 'text-black'}`}>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    filterData.map((data, index) => (
                        <div key={index}>
                            <h1 className={`font-bold text-lg ${colorMode === 'dark' ? 'text-white' : 'text-black'}`}>{data.filterType}</h1>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `${index}-${idx}`;
                                    return (
                                        <div className='flex items-center space-x-2 my-2' key={itemId}>
                                            <RadioGroupItem
                                                value={item}
                                                id={itemId}
                                                className={`${colorMode === 'dark' ? 'bg-gray-700 border-gray-500' : 'bg-white border-gray-300'}`}
                                            />
                                            <Label htmlFor={itemId} className={`${colorMode === 'dark' ? 'text-white' : 'text-black'}`}>{item}</Label>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    );
};

export default FilterCard;
