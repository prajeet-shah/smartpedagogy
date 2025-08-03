import React from "react";
import { Link } from "react-router"; // fixed router import

const cardStyle =
  "w-96 h-60 rounded-2xl text-white text-2xl font-bold flex justify-center items-center bg-cover bg-center relative overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300";

const overlayStyle = "absolute inset-0 bg-black bg-opacity-40 z-10 rounded-2xl";

const textStyle = "z-20";

const Teacher = () => {
  return (
    <div className="flex justify-around flex-wrap  my-36 mx-10">
      {/* Assignment Overview */}
      <Link to="/assignments">
        <div
          className={cardStyle}
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1584697964403-441f2893b019?auto=format&fit=crop&w=800&q=80')",
          }}
        >
          <div className={overlayStyle}></div>
          <span className={textStyle}>Assignment Overview</span>
        </div>
      </Link>

      {/* Classroom Overview */}
      <Link to="/classroom-overview">
        <div
          className={cardStyle}
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=800&q=80')",
          }}
        >
          <div className={overlayStyle}></div>
          <span className={textStyle}>Classroom Overview</span>
        </div>
      </Link>

      {/* Performance Dashboard */}
      <Link to="/performance-dashboard">
        <div
          className={cardStyle}
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1596496051146-b3c5f9d591d8?auto=format&fit=crop&w=800&q=80')",
          }}
        >
          <div className={overlayStyle}></div>
          <span className={textStyle}>Performance Dashboard</span>
        </div>
      </Link>
    </div>
  );
};

export default Teacher;
