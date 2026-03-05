import React from "react";

export default function ClientPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">

      <div className="max-w-6xl mx-auto px-6 text-center">

        <h1 className="text-4xl font-bold mb-6">
          Our Customers Love Us
        </h1>

        <p className="text-gray-600 mb-12">
          Thousands of readers trust our bookstore to find the best books.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold mb-2">Student Reader</h3>
            <p>
              "This bookstore helped me find many useful books for my studies."
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold mb-2">Tech Enthusiast</h3>
            <p>
              "Amazing collection of programming and technology books."
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold mb-2">Casual Reader</h3>
            <p>
              "Very easy to use and great book recommendations."
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}