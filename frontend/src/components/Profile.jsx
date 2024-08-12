import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from "@/components/ui/badge"; 
import {Label} from "@/components/ui/label"

import { Button } from "@/components/ui/button"
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';

const skills = ["HTML","CSS","JavaScript","Reactjs"];
const isResume = true;


const Profile = () => {
    const [open,setOpen] = useState(false);

  return (
    <div>
        <Navbar/>
        <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
            <div className='flex justify-between'>
                <div className='flex items-center gap-4'>
                    <Avatar className='h-24 w-24'>
                        <AvatarImage src='https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg' alt="profile"/>
                    </Avatar>
                    <div>
                    <h1 className='font-medium text-xl'>Full Name</h1>        
                    <p>Add your Bio Lorem ipsum dolor sit amet consectetur adipisicing elit. A iusto repellendus, aperiam magnam ipsam minus sunt labore sequi odit asperiores!</p>
                    </div>
                </div>
                    <Button onClick={()=>setOpen(true)} className='text-right' variant='outline'><Pen/></Button>
                </div>
            <div className='my-5'>
                <div className='flex items-center gap-3 '>
                <Mail/>
                <span>Ashish@gmail.com</span>
                </div>
                <div className='flex items-center gap-3 my-2'>
                <Contact/>
                <span>986325987</span>
                </div>
            </div>
            <div className='my-5'>
                <h1>Skills</h1>
                <div className='flex items-center gap-3 gap-1'>
                    {
                        skills.length !==  0 ? skills.map((item,index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>
                    }
                </div>
            </div>
            <div className='grid max-w-sm w-full items-center gap-1.5'>
                    <Label className='text-md font-bold'>Resume</Label>
                    {
                        isResume ? <a target='blank' href='https://youtube.com' className='text-blue-500 w-full hover:underline cursor-pointer'>New</a> : <span>NA</span>
                    }
            </div>
        </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                    <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                    <AppliedJobTable/>
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
    </div>
  )
}

export default Profile