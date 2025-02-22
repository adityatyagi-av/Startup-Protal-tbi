"use client";
import axios from "axios";
import TYPES from "../constant";
import { getHeaders } from "@/utils/authHeaders";
import toast from "react-hot-toast";

const API_ENDPOINT = "/startup/fetchRequestedDocs";

// Function to fetch authentication tokens from localStorage
const getTokens = () => {
  if (typeof window !== "undefined") {
    return {
      refreshToken: localStorage.getItem("refreshTokenFounder"),
      accessToken: localStorage.getItem("accessTokenFounder"),
    };
  }
  return { refreshToken: null, accessToken: null };
};

// Fetch Requested Documents Action
export const fetchRequestedDocs = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: TYPES.FETCH_REQUESTED_DOCS_REQUEST });

      const { refreshToken, accessToken } = getTokens();

      if (!refreshToken || !accessToken) {
        console.warn("Tokens missing in localStorage");
        return dispatch({
          type: TYPES.FETCH_REQUESTED_DOCS_FAILURE,
          payload: "Authentication tokens are missing.",
        });
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}${API_ENDPOINT}`,
        {
          headers: {
            Refresh: refreshToken,
            Access: accessToken,
          },
          withCredentials: true,
        }
      );

      if (response?.data?.success) {
        dispatch({
          type: TYPES.FETCH_REQUESTED_DOCS_SUCCESS,
          payload: response.data.data, // API response data
        });
      } else {
        dispatch({
          type: TYPES.FETCH_REQUESTED_DOCS_FAILURE,
          payload: response?.data?.message || "Failed to fetch requested documents.",
        });
      }
    } catch (error) {
      console.error("API Error:", error);
      dispatch({
        type: TYPES.FETCH_REQUESTED_DOCS_FAILURE,
        payload: error?.response?.data?.message || "An error occurred.",
      });
    }
  };
};
