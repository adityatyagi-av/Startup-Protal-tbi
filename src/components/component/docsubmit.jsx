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

    toast.promise(
      dispatch(uploadDoc(file, id)).then(() => {
        setOpen(false);
        setFile(null);
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
      <DialogContent className="w-full max-w-xs p-4 bg-white rounded-lg shadow-lg sm:max-w-md sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">Upload Document</DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <MyDropzonesingle
            file={file}
            setFile={setFile}
            message="Drop the requested file here"
            allowedTypes={new Set(["application/pdf"])}
          />
        </div>
        <div className="flex flex-col-reverse gap-2 mt-4 sm:flex-row sm:justify-end">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="w-full text-gray-700 border-gray-200 sm:w-auto hover:bg-gray-50"
            type="button"
          >
            Cancel
          </Button>
          <Button
            onClick={handleFileUpload}
            disabled={loading}
            className="w-full font-medium text-white bg-blue-900 sm:w-auto hover:bg-blue-800"
            type="button"
          >
            {loading ? "Uploading..." : "Submit"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocsubmitModal;
