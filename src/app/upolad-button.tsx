"use client";

import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useParams } from 'next/navigation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Doc, Id } from "../../convex/_generated/dataModel";

const formSchema = z.object({
  title: z.string().min(1).max(200),
  file: z
    .custom<FileList>((val) => val instanceof FileList, "Required")
    .refine((files) => files.length > 0, `Required`),
  email: z.string().min(1).max(200),
  country: z.string().min(1).max(200),
});

export function UploadButton() {
  const {confId} = useParams<{confId: Id<"conferences">}>();
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const createSub = useMutation(api.conference.createSubmission);
  const updateSubF = useMutation(api.conference.updateSubmissionField);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const fileRef = form.register("file");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const postUrl = await generateUploadUrl();

    const fileType = values.file[0].type;

    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": fileType },
      body: values.file[0],
    });
    const { storageId } = await result.json();

    interface Doc<T> {
      type: "image" | "pdf" | "csv" | "word" | "excel";
    }

    type DocType = Doc<"files">["type"];

    const types: Record<string, DocType> = {
      "image/png": "image",
      "image/jpeg": "image",
      "application/pdf": "pdf",
      "image/webp": "image",
      "image/jpg": "image",
      "text/csv": "csv",
      "application/vnd.ms-excel": "excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        "excel",
      "application/msword": "word",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        "word",
    };

    const id = await createFile({
      name: values.title,
      fileId: storageId,
      type: types[fileType],
    });

    const subId = await createSub({
      country: values.country,
      email: values.email,
      files: id,
      status : "pending"
    })

    await updateSubF({
      id: confId,
      subId : subId,
    })

    form.reset();
    setIsFileDialofOpen(false);
  }

  const [isFileDialofOpen, setIsFileDialofOpen] = useState(false);
  const createFile = useMutation(api.files.createFile);
  return (
    <Dialog open={isFileDialofOpen} onOpenChange={setIsFileDialofOpen}>
      <DialogTrigger asChild>
        <Button className="ml-20">Upload File</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-8">Upload your File Here</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field: { onChange }, ...field }) => (
                    <FormItem>
                      <FormLabel>File</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          {...fileRef}
                          onChange={(event) => {
                            if (!event.target.files) return;
                            onChange(event.target.files[0]);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
