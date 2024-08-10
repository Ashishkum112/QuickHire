import React from "react";
import { Link } from "react-router-dom";
import { Popover } from "../ui/popover";
import { Button } from "@/components/ui/button"
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User2 } from "lucide-react";

const Navbar = () => {
  const user = false;

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            <li>Home</li>
            <li>Jobs</li>
            <li>Browse</li>
          </ul>
          {
            !user?(
              <div className="flex items-center gap-2">
                <Link to='/login'>
                <Button variant ="outline">Login</Button>
                </Link>
                <Link to='/signup'>
                <Button className='bg-[#6A38C2] hover:bg-[#4b18a4]'>Sign Up</Button>
                </Link>
              </div>
            ):(
              <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className='flex gap-4 space-y-2'>
                <Avatar className='cursor-pointer'>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
                </Avatar>
                <div>
                <h4 className='font-medium'>Ashish Kumar</h4>
                <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus totam praesentium tempora alias voluptatibus voluptas tenetur </p>
                </div>
              </div>
              <div className="flex flex-col my-2 text-gray-500">
                <div className="flex w-fit items-center gap-2 cursor-pointer">
                <User2/>
                <Button variant="link">Profile</Button>
                </div >
                <div className="flex w-fit items-center gap-2 cursor-pointer">
                <LogOut/>
                <Button variant="link">Logout</Button>
                </div>

              </div>
            </PopoverContent>
          </Popover>
            )
          }
          
        </div>
      </div>
    </div>
  );
};

export default Navbar;
