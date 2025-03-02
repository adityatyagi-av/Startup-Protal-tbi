"use client";
import { useSelector } from "react-redux";
import RequestedItems from "../RequestedItems1/page";
import Spinner from "@/components/component/spinner";

export default function RequestedDocs() {
  const { officeSpaceData = [], loading, error } = useSelector((state) => state.requestOfficeSpace || {});

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500">Error loading office space data.</p>;

  const officeSpaceArray = Array.isArray(officeSpaceData) ? officeSpaceData : [];

  return <RequestedItems items={officeSpaceArray.map(doc => ({
    name: doc?.resource?.resourceName || "Unknown",
    date: doc?.createdAt || "N/A",
    ...doc
  }))} />;
}
