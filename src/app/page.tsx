"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { UploadButton } from "./upolad-button";
import { FileCard } from "./file-card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogDemo } from "@/components/ui/createconf";
import { CardDemo } from "@/components/ui/confcard";
import { useEffect } from "react";

export default function Home() {
  const conf = useQuery(api.conference.getConference);
  const conference = useMutation(api.conference.createConference);


  const createConference = () => {};
  return (
    <main className="container mx-auto pt-12">
      
      <Button className="mr-5">My Conferences</Button>
      <Button className="mr-5">All Conferences</Button>
      <DialogDemo />
      
      <div className="grid grid-cols-4 gap-4 mt-6">
        {/* {files?.map((file) => {
          return <FileCard key={file._id} file={file} />;
        })} */}

{
       conf?.map((conference, idx) => (
         <CardDemo key={idx} data={conference}/>
       ))
}

      </div>
    </main>
  );
}
