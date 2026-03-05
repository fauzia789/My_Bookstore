import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function LandingPage() {
  const slides = [
    {
      title: "Discover Your Next Great Book",
      desc: "Explore a wide collection of books including technology, business, science, and fiction. Find the perfect book for learning and entertainment.",
      img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
    },
    {
      title: "Order Books Online Easily",
      desc: "BookZone allows you to browse and purchase physical books through a simple and user-friendly online bookstore platform.",
      img: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    },
    {
      title: "Built With Modern MERN Technology",
      desc: "The platform is developed using MongoDB, Express, React, and Node.js to ensure fast performance and secure online transactions.",
      img: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
    },
    {
      title: "Convenient Book Delivery",
      desc: "After placing your order, your selected books will be processed and delivered to your location safely and efficiently.",
      img: "https://images.unsplash.com/photo-1507842217343-583bb7270b66",
    },
  ];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-white">
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-8 py-24 relative">
        {/* LEFT ARROW */}
        <button
          onClick={prevSlide}
          className="absolute -left-16 top-1/2 -translate-y-1/2 bg-zinc-800 p-4 rounded-full hover:bg-zinc-700 transition shadow-lg"
        >
          <FaArrowLeft />
        </button>

        {/* RIGHT ARROW */}
        <button
          onClick={nextSlide}
          className="absolute -right-16 top-1/2 -translate-y-1/2 bg-zinc-800 p-4 rounded-full hover:bg-zinc-700 transition shadow-lg"
        >
          <FaArrowRight />
        </button>

        <div className="grid md:grid-cols-2 items-center gap-16">
          {/* TEXT SIDE */}
          <div className="transition-all duration-700">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              {slides[current].title}
            </h1>

            <p className="text-zinc-400 text-lg mb-10 max-w-xl">
              {slides[current].desc}
            </p>

            <div className="flex gap-6">
              <a
                href="/"
                className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg font-semibold shadow-lg transition"
              >
                Visit BookZone
              </a>

              <a
                href="#demo"
                className="border border-blue-500 px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 transition"
              >
                Watch Demo
              </a>
            </div>
          </div>

          {/* IMAGE SIDE */}
          <div className="relative">
            <img
              src={slides[current].img}
              alt="book"
              className="rounded-2xl shadow-2xl w-full h-[420px] object-cover transition-all duration-700"
            />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 bg-zinc-900">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-16">Why Choose BookZone</h2>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-zinc-800 p-8 rounded-xl border border-zinc-700 hover:scale-105 transition">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">
                Huge Book Collection
              </h3>
              <p className="text-zinc-400">
                Browse books from technology, science, fiction and many other
                categories.
              </p>
            </div>

            <div className="bg-zinc-800 p-8 rounded-xl border border-zinc-700 hover:scale-105 transition">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">
                Easy Shopping
              </h3>
              <p className="text-zinc-400">
                Simple interface to search, explore and purchase books easily.
              </p>
            </div>

            <div className="bg-zinc-800 p-8 rounded-xl border border-zinc-700 hover:scale-105 transition">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">
                Secure Platform
              </h3>
              <p className="text-zinc-400">
                Developed with modern MERN stack technology ensuring reliability
                and security.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO */}
      <section id="demo" className="py-24 bg-zinc-950">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-8">See How BookZone Works</h2>

          <div className="aspect-video rounded-xl overflow-hidden border border-zinc-800 shadow-xl">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="BookZone Demo"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
