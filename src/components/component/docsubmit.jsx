"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { uploadDoc } from "@/store/Action/Upload_document_Action";
import MyDropzonesingle from "./Dropzones/page";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const DocsubmitModal = ({ id }) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);

  const { loading } = useSelector((state) => state.uploadDocument);

  const handleFileUpload = () => {
    if (!file) {
      toast.error("Please select a file before submitting.");
      return;
    }

    if (!id) {
      toast.error("Document ID is required!");
      return;
    }

    // Dispatch the upload action with file and ID
    toast.promise(
      dispatch(uploadDoc(file, id)).then(() => {
        setOpen(false); // Close modal on success
        setFile(null); // Clear selected file
      }),
      {
        loading: "Uploading document...",
        success: "Document uploaded successfully!",
        error: "Failed to upload document.",
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full h-[38px] rounded-lg bg-blue-900 text-white font-semibold text-lg hover:bg-blue-800">
          Upload doc
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white sm:max-w-[425px] rounded-lg shadow-lg p-6">
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
        </DialogHeader>
        <MyDropzonesingle
          file={file}
          setFile={setFile}
          message="Drop the requested file here"
          allowedTypes={new Set(["application/pdf"])}
        />
        <div className="flex justify-end mt-4">
          <Button onClick={handleFileUpload} disabled={loading}>
            {loading ? "Uploading..." : "Submit"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocsubmitModal;


{/* <Button
variant="outline"
onClick={() => setOpen(false)}
className="text-gray-700 border-gray-200 hover:bg-gray-50"
>
Cancel
</Button>
<Button
onClick={handlePutUnderEvaluation}
className="font-medium text-white bg-green-500 shadow-sm hover:bg-green-600"
>
save
</Button> */}