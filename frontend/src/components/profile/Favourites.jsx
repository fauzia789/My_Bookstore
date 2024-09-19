import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BookCard from '../BookCard/BookCard';

const Favourites = () => {
  const [FavouriteBooks, setFavouriteBooks] = useState([]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/get-favourite-books",
          { headers }
        );
        setFavouriteBooks(response.data.data || []);
      } catch (error) {
        console.error("Error fetching favourite books:", error);
      }
    };

    fetch();
  }, [FavouriteBooks]); // Empty array to prevent continuous re-fetching

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      {/* Display when no favourite books */}
      {FavouriteBooks.length === 0 && (
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-4xl md:text-5xl font-semibold text-zinc-500 mb-4">
            No Favourite Books
          </h2>
          <img
            src="./cover3.jpg"
            alt="No favourites"
            className="w-48 h-48 md:w-64 md:h-64 object-contain opacity-70"
          />
        </div>
      )}

      {/* Display books in a responsive grid */}
      {FavouriteBooks.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {FavouriteBooks.map((book, index) => (
            <BookCard key={index} data={book} favourite={true} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;
