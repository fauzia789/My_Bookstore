import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";

const ViewBooksDetails = () => {
  const { id } = useParams();
  const [Data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/get-book-by-id/${id}`);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching the book details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {Data && (
        <div className="px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row lg:gap-8 lg:justify-between items-center">
          {/* Book Image */}
          <div className="bg-zinc-800 rounded p-4 flex-1 flex items-center justify-center lg:w-1/2 w-full">
            {Data?.url ? (
              <img className="h-[70vh] object-contain w-full" src={Data.url} alt="Book Cover" />
            ) : (
              <p>No image available</p>
            )}
          </div>

          {/* Book Details */}
          <div className="p-4 text-white flex-1 lg:w-1/2 w-full">
            <h2 className="text-4xl font-bold mb-4">{Data?.title || "No title available"}</h2>
            <p className="text-lg mb-2">
              <span className="font-semibold">Author:</span> {Data?.author || "Unknown"}
            </p>
            <p className="text-lg mb-2">
              <span className="font-semibold">Description:</span> {Data?.desc || "No description available"}
            </p>
            <p className="text-lg mb-2">
              <span className="font-semibold">Price:</span> {Data?.price ? `$${Data.price}` : "Price not available"}
            </p>
            <p className="text-lg mb-2 flex items-center">
              <GrLanguage className="me-2" /> 
              <span> {Data?.language || "Not specified"}</span>
            </p>
          </div>
        </div>
      )}
      {!Data && (
        <div className="h-screen bg-zinc-900 flex items-center justify-center">
          <Loader />
        </div>
      )}
    </>
  );
};

export default ViewBooksDetails;
