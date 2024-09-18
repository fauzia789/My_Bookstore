import React from "react";
import { Link } from "react-router-dom";

const BookCard = ({ data }) => {
  return (
    <>
    <Link to={`/view-book-details/${data._id}`} className="no-underline">
      <div className="bg-zinc-800 rounded p-4 flex flex-col">
        <div className="bg-zinc-900 rounded flex items-center justify-center">
          <img src={data.url} alt="/"className="h-[25vh]" />
        </div>
        <div className="mt-2">
          <h3 className="text-white text-lg font-semibold">{data.title}</h3>
          <p className="text-gray-400">{data.author}</p>
          <p className="text-yellow-400">${data.price}</p>
        </div>
      </div>
    </Link>
    </>
  );
};

export default BookCard;
