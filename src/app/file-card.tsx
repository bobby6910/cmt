import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FileTextIcon,
  GanttChartIcon,
  ImageIcon,
  MoreVertical,
  TrashIcon,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ReactNode, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Doc, Id } from "../../convex/_generated/dataModel";
import Image from "next/image";

function FileCardActions({ file }: { file: Doc<"files"> }) {
  const deleteFile = useMutation(api.files.deleteFile);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  return (
    <>
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                deleteFile({ fileId: file._id });
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => {
              setIsConfirmOpen(true);
            }}
            className="flex gap-1 text-red-600 items-canter cursor-pointer"
          >
            <TrashIcon className="w-4 h-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export function FileCard({ file }: { file: Doc<"files"> }) {
  interface Doc<T> {
    type: "image" | "pdf" | "csv" | "word" | "excel";
  }

  const typeIcons: Record<Doc<"files">["type"], ReactNode> = {
    image: <ImageIcon />,
    pdf: <FileTextIcon />,
    csv: <GanttChartIcon />,
    word: <FileTextIcon />,
    excel: <FileTextIcon />,
  };

  const geturl = useMutation(api.files.generateDownloadUrl);

  const downloadFile = async (id: Id<"_storage">) => {
    const url = await geturl({ id: id });

    if (url) window.open(url, "_blank");
  };
  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle className="flex gap-2">
          {" "}
          <div className="flex justify-center">{typeIcons[file.type]}</div>{" "}
          {file.name}
        </CardTitle>
        <div className="absolute top-1 right-1">
          <FileCardActions file={file} />
        </div>
        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
      <CardFooter>
        <Button onClick={() => downloadFile(file.fileId)}>Download</Button>
      </CardFooter>
    </Card>
  );
}
