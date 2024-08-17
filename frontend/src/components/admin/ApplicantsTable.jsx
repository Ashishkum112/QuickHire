import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover } from "../ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {

    const {applicants} = useSelector(store=>store.application);


  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applied user</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
          </TableHeader>
          <TableBody>
            {
                applicants && applicants?.applications?.map((item)=>(
            <tr key={item._id}>
              <TableHead>{item.applicant?.fullname}</TableHead>
              <TableHead>{item.applicant?.email}</TableHead>
              <TableHead>{item.applicant?.phoneNumber}</TableHead>
              <TableCell >
                                    {
                                        item.applicant?.profile?.resume ? <a className="text-blue-600 cursor-pointer" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">{item?.applicant?.profile?.resumeOriginalName}</a> : <span>Not Uploaded</span>
                                    }
                </TableCell>
              <TableHead>{item?.applicant?.createdAt.split("T")[0]}</TableHead>
              <TableHead className="float-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    {
                    shortlistingStatus.map((status, index) => {
                      return (
                        <div key={index} className="flex w-fit items-center my-2 cursor-pointer">
                          <span>{status}</span>
                        </div>
                      );
                    })}
                  </PopoverContent>
                </Popover>
              </TableHead>
            </tr>
                ))
            }
            
          </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
