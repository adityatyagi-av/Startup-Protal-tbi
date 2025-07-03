"use client";
import TYPES from "../constant";
import toast from "react-hot-toast";
import api from "@/services/api";

export const uploadDoc = (file, docId) => {
  return async (dispatch) => {
    try {
      if (!file) {
        toast.error("No file selected!");
        return;
      }

      if (!docId) {
        toast.error("Document ID is required!");
        return;
      }

      dispatch({ type: TYPES.UPLOAD_DOC_REQUEST });

      const formData = new FormData();
      formData.append("doc", file);
      formData.append("docId", docId); 

      const response = await api.post(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/startup/uploadDoc`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response?.data?.success) {
        dispatch({
          type: TYPES.UPLOAD_DOC_SUCCESS,
          payload: response.data,
        });
        toast.success(response.data.message || "Document uploaded successfully!");
      } else {
        throw new Error(response?.data?.message || "Failed to upload document.");
      }
    } catch (error) {
      console.error("Upload Error:", error);
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred during upload.";
      dispatch({ type: TYPES.UPLOAD_DOC_FAILURE, payload: errorMessage });
      toast.error(errorMessage);
    }
  };
};
